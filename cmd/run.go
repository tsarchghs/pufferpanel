package main

import (
	"encoding/hex"
	"errors"
	"fmt"
	"github.com/braintree/manners"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/securecookie"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/config"
	"github.com/tsarchghs/pufferpanel/database"
	"github.com/tsarchghs/pufferpanel/logging"
	"github.com/tsarchghs/pufferpanel/servers"
	"github.com/tsarchghs/pufferpanel/services"
	"github.com/tsarchghs/pufferpanel/sftp"
	"github.com/tsarchghs/pufferpanel/web"
	"github.com/spf13/cobra"
	"net"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"strings"
	"syscall"
	"time"
)

var runCmd = &cobra.Command{
	Use:    "run",
	Short:  "Runs the panel",
	Run:    executeRun,
	Hidden: true,
}

var webService *manners.GracefulServer

func executeRun(cmd *cobra.Command, args []string) {
	term, _ := internalRun()
	<-term
	closePanel()
}

func internalRun() (terminate chan bool, success bool) {
	logging.Initialize(true)
	signal.Ignore(syscall.SIGPIPE, syscall.SIGHUP)

	terminate = make(chan bool, 2)

	go func() {
		quit := make(chan os.Signal, 1)
		// kill (no param) default send syscall.SIGTERM
		// kill -2 is syscall.SIGINT
		// kill -9 is syscall.SIGKILL but can"t be catch, so don't need add it
		signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
		<-quit
		logging.Info.Println("Shutting down...")
		terminate <- true
	}()

	pufferpanel.DetermineKernelSupport()

	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(gin.LoggerWithWriter(logging.Info.Writer()))
	gin.DefaultWriter = logging.Info.Writer()
	gin.DefaultErrorWriter = logging.Error.Writer()
	pufferpanel.Engine = router

	if config.PanelEnabled.Value() {
		panel()

		db, err := database.GetConnection()
		if err != nil {
			logging.Error.Printf("error connecting to database: %s", err.Error())
			terminate <- true
			return
		}

		err = database.Migrate(db)
		if err != nil {
			logging.Error.Printf("error upgrading database: %s", err.Error())
			terminate <- true
			return
		}

		if config.SessionKey.Value() == "" {
			k := securecookie.GenerateRandomKey(32)
			if err := config.SessionKey.Set(hex.EncodeToString(k), true); err != nil {
				logging.Error.Printf("error saving session key: %s", err.Error())
				terminate <- true
				return
			}
		}

		result, err := hex.DecodeString(config.SessionKey.Value())
		if err != nil {
			logging.Error.Printf("error decoding session key: %s", err.Error())
			terminate <- true
			return
		}
		sessionStore := cookie.NewStore(result)
		router.Use(sessions.Sessions("session", sessionStore))

		if config.DaemonEnabled.Value() {
			services.SyncNodeToConfig()
		}
	}

	if config.DaemonEnabled.Value() {
		err := daemon()
		if err != nil {
			logging.Error.Printf("error starting daemon server: %s", err.Error())
			terminate <- true
			return
		}
	}

	web.RegisterRoutes(router)

	l, err := net.Listen("tcp", config.WebHost.Value())
	if err != nil {
		logging.Error.Printf("error starting http server: %s", err.Error())
		terminate <- true
		return
	}

	logging.Info.Printf("Listening for HTTP requests on %s", l.Addr().String())
	webService = manners.NewWithServer(&http.Server{Handler: router})

	go func() {
		err = webService.Serve(l)
		if err != nil && !errors.Is(err, http.ErrServerClosed) {
			logging.Error.Printf("error listening for http requests: %s", err.Error())
			terminate <- true
		}
	}()

	success = true
	return
}

func closePanel() {
	//shut down everything
	//all of these can be closed regardless of what type of install this is, as they all check if they are even being
	//used
	logging.Debug.Printf("stopping http server")
	if webService != nil {
		webService.Close()
	}

	logging.Debug.Printf("stopping sftp server")
	sftp.Stop()

	logging.Debug.Printf("stopping servers")
	servers.ShutdownService()
	for _, p := range servers.GetAll() {
		_ = p.Stop()
		p.RunningEnvironment.WaitForMainProcessFor(time.Minute) //wait 60 seconds
	}

	logging.Debug.Printf("stopping database connections")
	database.Close()
}

func panel() {
	services.LoadEmailService()

	//if we have the web, then let's use our sftp auth instead
	sftp.SetAuthorization(&services.DatabaseSFTPAuthorization{})
}

func daemon() error {
	sftp.Run()

	var err error

	if _, err = os.Stat(config.ServersFolder.Value()); os.IsNotExist(err) {
		logging.Info.Printf("No server directory found, creating")
		err = os.MkdirAll(config.ServersFolder.Value(), 0755)
		if err != nil && !os.IsExist(err) {
			return err
		}
	}

	err = os.MkdirAll(config.BinariesFolder.Value(), 0755)
	if err != nil {
		logging.Error.Printf("Error creating binaries folder: %s", err.Error())
	}

	//update path to include our binary folder
	newPath := os.Getenv("PATH")
	fullPath, _ := filepath.Abs(config.BinariesFolder.Value())
	if !strings.Contains(newPath, fullPath) {
		_ = os.Setenv("PATH", fmt.Sprintf("%s%c%s", newPath, os.PathListSeparator, fullPath))
	}
	logging.Debug.Printf("Daemon PATH variable: %s", os.Getenv("PATH"))

	servers.LoadFromFolder()

	servers.InitService()

	for _, element := range servers.GetAll() {
		element.GetEnvironment().DisplayToConsole(true, "Daemon has been started\n")
		if element.IsAutoStart() {
			logging.Info.Printf("Queued server %s", element.Id())
			element.GetEnvironment().DisplayToConsole(true, "Server has been queued to start\n")
			servers.StartViaService(element)
		}
	}
	return nil
}
