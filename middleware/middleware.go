package middleware

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/logging"
	"github.com/tsarchghs/pufferpanel/models"
	"github.com/tsarchghs/pufferpanel/response"
	"github.com/tsarchghs/pufferpanel/servers"
	"github.com/tsarchghs/pufferpanel/services"
	"net/http"
	"runtime/debug"
	"strings"
)

func ResponseAndRecover(c *gin.Context) {
	defer func() {
		if err := recover(); err != nil {
			if _, ok := err.(error); !ok {
				err = errors.New(pufferpanel.ToString(err))
			}
			response.HandleError(c, err.(error), http.StatusInternalServerError)

			logging.Error.Printf("Error handling route\n%+v\n%s", err, debug.Stack())
			c.Abort()
		}
	}()

	c.Next()
}

func Recover(c *gin.Context) {
	defer func() {
		if err := recover(); err != nil {
			logging.Error.Printf("Error handling route\n%+v\n%s", err, debug.Stack())
			c.AbortWithStatus(http.StatusInternalServerError)
		}
	}()

	c.Next()
}

func RequiresPermission(perm *pufferpanel.Scope) gin.HandlerFunc {
	return func(c *gin.Context) {
		requiresPermission(c, perm)
	}
}

func requiresPermission(c *gin.Context, perm *pufferpanel.Scope) {
	//fail-safe in the event something pukes, we don't end up accidentally giving rights to something they should not
	actuallyFinished := false
	defer func() {
		if !actuallyFinished && !c.IsAborted() {
			c.AbortWithStatus(http.StatusInternalServerError)
		}
	}()

	NeedsDatabase(c)
	if c.IsAborted() {
		return
	}

	userGin, exists := c.Get("user")
	if !exists {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}
	user, ok := userGin.(*models.User)
	if !ok {
		panic("user not defined")
	}

	//we now have a user and they are allowed to access something, let's confirm they have server access
	serverId := c.Param("serverId")
	if perm.ForServer && serverId == "" {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	db := GetDatabase(c)
	ps := &services.Permission{DB: db}

	var perms []*models.Permissions

	p, err := ps.GetForUserAndServer(user.ID, serverId)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	perms = append(perms, p)
	if serverId != "" {
		//if we had a server, also grab global scopes
		p, err = ps.GetForUserAndServer(user.ID, "")
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}
		perms = append(perms, p)
	}

	allowed := false
	scopes := make([]*pufferpanel.Scope, 0)
	for _, p := range perms {
		if pufferpanel.ContainsScope(p.Scopes, perm) {
			allowed = true
		}
	}

	if !allowed {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	c.Set("scopes", scopes)
	actuallyFinished = true
}

func GetToken(c *gin.Context) string {
	//use header first, because we set that a lot
	authHeader := c.Request.Header.Get("Authorization")

	if authHeader != "" {
		authHeader = strings.TrimSpace(authHeader)
		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 {
			return ""
		}

		if parts[0] != "Bearer" || parts[1] == "" {
			return ""
		}

		return parts[1]
	}

	cookie, err := c.Cookie("puffer_auth")
	if errors.Is(err, http.ErrNoCookie) {
		return ""
	}
	return strings.TrimSpace(cookie)
}

func ResolveServerPanel(c *gin.Context) {
	serverId := c.Param("serverId")
	if serverId == "" {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	db := GetDatabase(c)
	ss := &services.Server{DB: db}
	server, err := ss.Get(serverId)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	} else if server == nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}
	c.Set("server", server)
}

func ResolveServerNode(c *gin.Context) {
	serverId := c.Param("serverId")
	if serverId == "" {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	server := servers.GetFromCache(serverId)
	if server == nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}
	c.Set("program", server)
}
