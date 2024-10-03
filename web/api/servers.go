package api

import (
	"bytes"
	"encoding/json"
	"errors"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gofrs/uuid/v5"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/database"
	"github.com/tsarchghs/pufferpanel/logging"
	"github.com/tsarchghs/pufferpanel/middleware"
	"github.com/tsarchghs/pufferpanel/models"
	"github.com/tsarchghs/pufferpanel/response"
	"github.com/tsarchghs/pufferpanel/services"
	"github.com/spf13/cast"
	"gorm.io/gorm"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

func registerServers(g *gin.RouterGroup) {
	g.Handle("GET", "", searchServers)
	g.Handle("OPTIONS", "", response.CreateOptions("GET"))

	g.Handle("GET", "/:serverId", middleware.RequiresPermission(pufferpanel.ScopeServerView), middleware.ResolveServerPanel, getServer)
	g.Handle("PUT", "/:serverId", middleware.RequiresPermission(pufferpanel.ScopeServerCreate), middleware.HasTransaction, createServer)
	g.Handle("DELETE", "/:serverId", middleware.RequiresPermission(pufferpanel.ScopeServerDelete), middleware.ResolveServerPanel, middleware.HasTransaction, deleteServer)
	g.Handle("OPTIONS", "/:serverId", response.CreateOptions("PUT", "GET", "POST", "DELETE"))

	g.Handle("PUT", "/:serverId/name/:name", middleware.RequiresPermission(pufferpanel.ScopeServerEditName), middleware.ResolveServerPanel, middleware.HasTransaction, renameServer)
	g.Handle("OPTIONS", "/:serverId/name", response.CreateOptions("PUT"))
	g.Handle("OPTIONS", "/:serverId/name/:name", response.CreateOptions("PUT"))

	g.Handle("GET", "/:serverId/definition", middleware.RequiresPermission(pufferpanel.ScopeServerViewDefinition), middleware.ResolveServerPanel, proxyServerRequest)
	g.Handle("PUT", "/:serverId/definition", middleware.RequiresPermission(pufferpanel.ScopeServerEditDefinition), middleware.ResolveServerPanel, middleware.HasTransaction, editServer)
	g.Handle("OPTIONS", "/:serverId/definition", response.CreateOptions("PUT", "GET"))

	g.Handle("GET", "/:serverId/user", middleware.RequiresPermission(pufferpanel.ScopeServerUserView), middleware.ResolveServerPanel, getServerUsers)
	g.Handle("OPTIONS", "/:serverId/user", response.CreateOptions("GET"))

	g.Handle("GET", "/:serverId/user/:email", middleware.RequiresPermission(pufferpanel.ScopeServerUserView), middleware.ResolveServerPanel, getServerUsers)
	g.Handle("PUT", "/:serverId/user/:email", middleware.RequiresPermission(pufferpanel.ScopeServerUserEdit), middleware.ResolveServerPanel, middleware.HasTransaction, editServerUser)
	g.Handle("DELETE", "/:serverId/user/:email", middleware.RequiresPermission(pufferpanel.ScopeServerUserDelete), middleware.ResolveServerPanel, middleware.HasTransaction, removeServerUser)
	g.Handle("OPTIONS", "/:serverId/user/:email", response.CreateOptions("GET", "PUT", "DELETE"))

	g.GET("/:serverId/data", middleware.RequiresPermission(pufferpanel.ScopeServerViewData), middleware.ResolveServerPanel, proxyServerRequest)
	g.POST("/:serverId/data", middleware.RequiresPermission(pufferpanel.ScopeServerEditData), middleware.ResolveServerPanel, editServerData)
	g.PUT("/:serverId/data", middleware.RequiresPermission(pufferpanel.ScopeServerEditDataAdmin), middleware.ResolveServerPanel, editServerDataAdmin)
	g.OPTIONS("/:serverId/data", response.CreateOptions("GET", "POST", "PUT"))

	g.GET("/:serverId/flags", middleware.RequiresPermission(pufferpanel.ScopeServerViewFlags), middleware.ResolveServerPanel, proxyServerRequest)
	g.POST("/:serverId/flags", middleware.RequiresPermission(pufferpanel.ScopeServerEditFlags), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/flags", response.CreateOptions("GET", "POST"))

	g.GET("/:serverId/tasks", middleware.RequiresPermission(pufferpanel.ScopeServerTaskView), middleware.ResolveServerPanel, proxyServerRequest)
	g.POST("/:serverId/tasks", middleware.RequiresPermission(pufferpanel.ScopeServerTaskCreate), middleware.ResolveServerPanel, proxyServerRequest)
	g.PUT("/:serverId/tasks/:taskId", middleware.RequiresPermission(pufferpanel.ScopeServerTaskEdit), middleware.ResolveServerPanel, proxyServerRequest)
	g.DELETE("/:serverId/tasks/:taskId", middleware.RequiresPermission(pufferpanel.ScopeServerTaskDelete), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/tasks", response.CreateOptions("GET", "POST", "PUT", "DELETE"))

	//g.POST("/:serverId/tasks/:taskId/run", middleware.OAuth2Handler(pufferpanel.ScopeServersEdit, true), RunServerTask)
	//g.OPTIONS("/:serverId/tasks/:taskId/run", response.CreateOptions("POST"))

	g.POST("/:serverId/reload", middleware.RequiresPermission(pufferpanel.ScopeServerReload), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/reload", response.CreateOptions("POST"))

	g.POST("/:serverId/start", middleware.RequiresPermission(pufferpanel.ScopeServerStart), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/start", response.CreateOptions("POST"))

	g.POST("/:serverId/stop", middleware.RequiresPermission(pufferpanel.ScopeServerStop), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/stop", response.CreateOptions("POST"))

	g.POST("/:serverId/kill", middleware.RequiresPermission(pufferpanel.ScopeServerKill), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/kill", response.CreateOptions("POST"))

	g.POST("/:serverId/install", middleware.RequiresPermission(pufferpanel.ScopeServerInstall), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/install", response.CreateOptions("POST"))

	g.GET("/:serverId/file/*filename", middleware.RequiresPermission(pufferpanel.ScopeServerFileView), middleware.ResolveServerPanel, proxyServerRequest)
	g.PUT("/:serverId/file/*filename", middleware.RequiresPermission(pufferpanel.ScopeServerFileEdit), middleware.ResolveServerPanel, proxyServerRequest)
	g.DELETE("/:serverId/file/*filename", middleware.RequiresPermission(pufferpanel.ScopeServerFileEdit), middleware.ResolveServerPanel, proxyServerRequest)
	g.POST("/:serverId/file/*filename", middleware.RequiresPermission(pufferpanel.ScopeServerFileEdit), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/file/*filename", response.CreateOptions("GET", "PUT", "DELETE", "POST"))

	g.GET("/:serverId/console", middleware.RequiresPermission(pufferpanel.ScopeServerConsole), middleware.ResolveServerPanel, proxyServerRequest)
	g.POST("/:serverId/console", middleware.RequiresPermission(pufferpanel.ScopeServerSendCommand), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/console", response.CreateOptions("GET", "POST"))

	g.GET("/:serverId/stats", middleware.RequiresPermission(pufferpanel.ScopeServerStats), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/stats", response.CreateOptions("GET"))

	g.HEAD("/:serverId/query", middleware.RequiresPermission(pufferpanel.ScopeServerStats), middleware.ResolveServerPanel, proxyServerRequest)
	g.GET("/:serverId/query", middleware.RequiresPermission(pufferpanel.ScopeServerStats), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/query", response.CreateOptions("POST"))

	g.GET("/:serverId/status", middleware.RequiresPermission(pufferpanel.ScopeServerStatus), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/status", response.CreateOptions("GET"))

	g.HEAD("/:serverId/archive/*filename", middleware.RequiresPermission(pufferpanel.ScopeServerFileEdit), middleware.ResolveServerPanel, proxyServerRequest)
	g.POST("/:serverId/archive/*filename", middleware.RequiresPermission(pufferpanel.ScopeServerFileEdit), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/archive/*filename", response.CreateOptions("HEAD", "POST"))

	g.POST("/:serverId/extract/*filename", middleware.RequiresPermission(pufferpanel.ScopeServerFileEdit), middleware.ResolveServerPanel, proxyServerRequest)
	g.OPTIONS("/:serverId/extract/*filename", response.CreateOptions("POST"))

	p := g.Group("/:serverId/socket")
	{
		p.GET("", middleware.RequiresPermission(pufferpanel.ScopeServerView), cors.New(cors.Config{
			AllowAllOrigins:  true,
			AllowCredentials: true,
		}), middleware.ResolveServerPanel, proxyServerRequest)
		p.Handle("CONNECT", "", middleware.RequiresPermission(pufferpanel.ScopeServerView), func(c *gin.Context) {
			c.Header("Access-Control-Allow-Origin", "*")
			c.Header("Access-Control-Allow-Credentials", "false")
		})
		p.OPTIONS("", response.CreateOptions("GET"))
	}
}

// @Summary Search servers
// @Description Gets servers, and allowing for filtering of servers. * is a wildcard that can be used for text inputs
// @Success 200 {object} models.ServerSearchResponse
// @Param username query string false "Username to filter on, default is current user if NOT admin"
// @Param node query uint false "Node ID to filter on"
// @Param name query string false "Name of server to filter on"
// @Param limit query uint false "Max number of results to return"
// @Param page query uint false "What page to get back for many results"
// @Router /api/servers [get]
// @Security OAuth2Application[server.view]
func searchServers(c *gin.Context) {
	var err error
	db := middleware.GetDatabase(c)
	ss := &services.Server{DB: db}
	ps := &services.Permission{DB: db}

	username := c.DefaultQuery("username", "")
	nodeQuery := c.DefaultQuery("node", "0")
	nameFilter := c.DefaultQuery("name", "*")
	pageSizeQuery := c.DefaultQuery("limit", strconv.Itoa(DefaultPageSize))
	pageQuery := c.DefaultQuery("page", strconv.Itoa(1))

	pageSize, err := strconv.Atoi(pageSizeQuery)
	if response.HandleError(c, err, http.StatusBadRequest) || pageSize <= 0 {
		response.HandleError(c, pufferpanel.ErrFieldTooSmall("pageSize", 0), http.StatusBadRequest)
		return
	}

	if pageSize > MaxPageSize {
		pageSize = MaxPageSize
	}

	page, err := strconv.Atoi(pageQuery)
	if response.HandleError(c, err, http.StatusBadRequest) || page <= 0 {
		response.HandleError(c, pufferpanel.ErrFieldTooSmall("page", 0), http.StatusBadRequest)
		return
	}

	node, err := strconv.Atoi(nodeQuery)
	if response.HandleError(c, err, http.StatusBadRequest) || node < 0 {
		response.HandleError(c, pufferpanel.ErrFieldTooSmall("nodeId", 0), http.StatusBadRequest)
		return
	}

	user := c.MustGet("user").(*models.User)

	perms, err := ps.GetForUser(user.ID)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	isAdmin := false
	for _, p := range perms {
		if pufferpanel.ContainsScope(p.Scopes, pufferpanel.ScopeAdmin) {
			isAdmin = true
		}
	}

	if !isAdmin && username != "" && user.Username != username {
		c.JSON(http.StatusOK, &models.ServerSearchResponse{
			Servers: []*models.ServerView{},
			Metadata: &pufferpanel.Metadata{Paging: &pufferpanel.Paging{
				Page:    1,
				Size:    0,
				MaxSize: MaxPageSize,
				Total:   0,
			}},
		})
		return
	} else if !isAdmin {
		username = user.Username
	}

	searchCriteria := services.ServerSearch{
		Username: username,
		NodeId:   uint(node),
		Name:     nameFilter,
		PageSize: uint(pageSize),
		Page:     uint(page),
	}

	results, total, err := ss.Search(searchCriteria)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	data := models.RemoveServerPrivateInfoFromAll(models.FromServers(results))

	for _, v := range data {
		if isAdmin {
			v.CanGetStatus = true
			continue
		}

		serverPerms, _ := ps.GetForUserAndServer(user.ID, v.Identifier)
		for _, p := range append(perms, serverPerms) {
			if p == nil {
				continue
			}
			if pufferpanel.ContainsScope(p.Scopes, pufferpanel.ScopeServerStatus) {
				v.CanGetStatus = true
				break
			}
		}
	}

	c.JSON(http.StatusOK, &models.ServerSearchResponse{
		Servers: data,
		Metadata: &pufferpanel.Metadata{Paging: &pufferpanel.Paging{
			Page:    uint(page),
			Size:    uint(pageSize),
			MaxSize: MaxPageSize,
			Total:   total,
		}},
	})
}

// @Summary Get a server
// @Description Gets a particular server
// @Success 200 {object} models.GetServerResponse
// @Param id path string true "Server ID"
// @Router /api/servers/{id} [get]
// @Security OAuth2Application[server.view]
func getServer(c *gin.Context) {
	server := getServerFromGin(c)

	_, includePerms := c.GetQuery("perms")
	var perms *models.PermissionView
	if includePerms {
		db, err := database.GetConnection()
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}

		u := c.MustGet("user").(*models.User)

		ps := &services.Permission{DB: db}

		p, err := ps.GetForUserAndServer(u.ID, server.Identifier)
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}
		perms = models.FromPermission(p)
	}

	d := &models.GetServerResponse{
		Server: models.RemoveServerPrivateInfo(models.FromServer(server)),
		Perms:  perms,
	}

	c.JSON(http.StatusOK, d)
}

// @Summary Create server
// @Description Creates a server
// @Success 200 {object} models.CreateServerResponse
// @Param id path string true "Server ID"
// @Param server body models.ServerCreation true "Creation information"
// @Router /api/servers/{id} [put]
// @Security OAuth2Application[server.create]
func createServer(c *gin.Context) {
	var err error
	db := middleware.GetDatabase(c)
	ss := &services.Server{DB: db}
	ns := &services.Node{DB: db}
	us := &services.User{DB: db}
	ps := &services.Permission{DB: db}

	serverId := c.Param("serverId")

	if serverId == "" {
		gen, err := uuid.NewV4()
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}
		serverId = gen.String()[:8]
	}

	postBody := &models.ServerCreation{}
	err = c.ShouldBindJSON(&postBody)
	postBody.Identifier = serverId
	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	node, err := ns.Get(postBody.NodeId)

	if errors.Is(err, gorm.ErrRecordNotFound) {
		response.HandleError(c, pufferpanel.ErrNodeInvalid, http.StatusBadRequest)
		return
	} else if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	port, err := getFromDataOrDefault(postBody.Variables, "port", uint16(0))
	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	ip, err := getFromDataOrDefault(postBody.Variables, "ip", "0.0.0.0")
	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	if postBody.Name == "" {
		postBody.Name = postBody.Identifier
	}

	server := &models.Server{
		Name:       postBody.Name,
		Identifier: postBody.Identifier,
		NodeID:     node.ID,
		IP:         cast.ToString(ip),
		Port:       cast.ToUint16(port),
		Type:       postBody.Type.Type,
		Icon:       postBody.Icon,
	}

	users := make([]*models.User, len(postBody.Users))

	for k, v := range postBody.Users {
		user, err := us.Get(v)
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}

		users[k] = user
	}

	err = ss.Create(server)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	for _, v := range users {
		perm, err := ps.GetForUserAndServer(v.ID, server.Identifier)
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}

		perm.Scopes = []*pufferpanel.Scope{
			pufferpanel.ScopeServerView,
			pufferpanel.ScopeServerViewData,
			pufferpanel.ScopeServerEditData,
			pufferpanel.ScopeServerEditFlags,
			pufferpanel.ScopeServerEditName,
			pufferpanel.ScopeServerViewData,
			pufferpanel.ScopeServerClientView,
			pufferpanel.ScopeServerClientEdit,
			pufferpanel.ScopeServerClientCreate,
			pufferpanel.ScopeServerClientDelete,
			pufferpanel.ScopeServerUserView,
			pufferpanel.ScopeServerUserCreate,
			pufferpanel.ScopeServerUserEdit,
			pufferpanel.ScopeServerUserDelete,
			pufferpanel.ScopeServerTaskView,
			pufferpanel.ScopeServerTaskRun,
			pufferpanel.ScopeServerTaskCreate,
			pufferpanel.ScopeServerTaskDelete,
			pufferpanel.ScopeServerReload,
			pufferpanel.ScopeServerStart,
			pufferpanel.ScopeServerStop,
			pufferpanel.ScopeServerKill,
			pufferpanel.ScopeServerInstall,
			pufferpanel.ScopeServerFileView,
			pufferpanel.ScopeServerFileEdit,
			pufferpanel.ScopeServerSftp,
			pufferpanel.ScopeServerConsole,
			pufferpanel.ScopeServerSendCommand,
			pufferpanel.ScopeServerStats,
			pufferpanel.ScopeServerStatus,
		}

		err = ps.UpdatePermissions(perm)
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}
	}

	reader := &bytes.Buffer{}
	err = json.NewEncoder(reader).Encode(&postBody.Server)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	nodeResponse, err := ns.CallNode(node, "PUT", "/daemon/server/"+server.Identifier, io.NopCloser(reader), c.Request.Header)
	if nodeResponse != nil {
		defer pufferpanel.Close(nodeResponse.Body)
	}

	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	if nodeResponse.StatusCode != http.StatusOK {
		resData, err := io.ReadAll(nodeResponse.Body)
		if err != nil {
			logging.Error.Printf("Failed to parse response from daemon\n%s", err.Error())
		}
		logging.Error.Printf("Unexpected response from daemon: %+v\n%s", nodeResponse.StatusCode, string(resData))
		//assume daemon gives us a valid response, directly forward to client
		c.Header("Content-Type", "application/json")
		c.Status(nodeResponse.StatusCode)
		_, _ = c.Writer.Write(resData)
		c.Abort()
		return
	}

	es := services.GetEmailService()
	for _, user := range users {
		err = es.SendEmail(user.Email, "addedToServer", map[string]interface{}{
			"Server":        server,
			"RegisterToken": "",
		}, true)
		if err != nil {
			//since we don't want to tell the user it failed, we'll log and move on
			logging.Error.Printf("Error sending email: %s", err)
		}
	}

	c.JSON(http.StatusOK, &models.CreateServerResponse{Id: serverId})
}

// @Summary Update server definition
// @Description Updates a server definition
// @Success 204 {object} nil
// @Param id path string true "Server ID"
// @Param server body models.ServerWithName true "Server definition"
// @Router /api/servers/{id}/definition [put]
// @Security OAuth2Application[server.definition.edit]
func editServer(c *gin.Context) {
	var err error
	db := middleware.GetDatabase(c)
	ss := &services.Server{DB: db}
	ns := &services.Node{DB: db}

	server := getServerFromGin(c)

	postBody := &models.ServerWithName{}
	err = c.BindJSON(postBody)
	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	postBody.Identifier = server.Identifier

	port, err := getFromDataOrDefault(postBody.Variables, "port", uint16(0))
	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}
	server.Port = cast.ToUint16(port)

	ip, err := getFromDataOrDefault(postBody.Variables, "ip", "0.0.0.0")
	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}
	server.IP = cast.ToString(ip)

	if postBody.Name != "" {
		server.Name = postBody.Name
	}

	if postBody.Type.Type != "" {
		server.Type = postBody.Type.Type
	}

	if postBody.Icon != "" {
		server.Icon = postBody.Icon
	}

	err = ss.Update(server)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	data, _ := json.Marshal(postBody)
	reader := io.NopCloser(bytes.NewReader(data))

	nodeResponse, err := ns.CallNode(&server.Node, "PUT", "/daemon/server/"+postBody.Identifier+"/definition", reader, c.Request.Header)
	defer pufferpanel.CloseResponse(nodeResponse)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	if nodeResponse.StatusCode != http.StatusNoContent {
		resData, err := io.ReadAll(nodeResponse.Body)
		if err != nil {
			logging.Error.Printf("Failed to parse response from daemon\n%s", err.Error())
		}
		logging.Error.Printf("Unexpected response from daemon: %+v\n%s", nodeResponse.StatusCode, string(resData))
		//assume daemon gives us a valid response, directly forward to client
		c.Header("Content-Type", "application/json")
		c.Status(nodeResponse.StatusCode)
		_, _ = c.Writer.Write(resData)
		e := c.Error(errors.New("unexpected response from daemon"))
		response.HandleError(c, e, http.StatusInternalServerError)
		return
	}

	if response.HandleError(c, db.Commit().Error, http.StatusInternalServerError) {
		return
	}
	c.Status(http.StatusNoContent)
}

// @Summary Deletes a server
// @Description Deletes a server from the panel
// @Success 204 {object} nil
// @Param id path string true "Server ID"
// @Router /api/servers/{id} [delete]
// @Security OAuth2Application[server.delete]
func deleteServer(c *gin.Context) {
	var err error

	db := middleware.GetDatabase(c)
	ss := &services.Server{DB: db}
	ns := &services.Node{DB: db}

	server := getServerFromGin(c)

	node := &server.Node

	//we need to know what users are impacted by a server being deleted
	ps := services.Permission{DB: db}
	users := make([]models.User, 0)
	perms, err := ps.GetForServer(server.Identifier)
	if err != nil {
		response.HandleError(c, err, http.StatusInternalServerError)
		return
	}
	for _, p := range perms {
		exists := false
		for _, u := range users {
			if u.ID == p.User.ID {
				exists = true
				break
			}
		}
		if exists {
			continue
		}
		users = append(users, p.User)
	}

	_, skipNode := c.GetQuery("skipNode")
	if !skipNode {
		nodeRes, err := ns.CallNode(node, "DELETE", "/daemon/server/"+server.Identifier, nil, nil)
		if response.HandleError(c, err, http.StatusInternalServerError) {
			//node didn't permit it, REVERT!
			db.Rollback()
			return
		}

		if nodeRes.StatusCode != http.StatusNoContent {
			response.HandleError(c, errors.New("invalid status code response: "+nodeRes.Status), http.StatusInternalServerError)
			return
		}
	}

	err = ss.Delete(server.Identifier)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		db.Rollback()
		return
	}

	if response.HandleError(c, db.Commit().Error, http.StatusInternalServerError) {
		return
	}

	es := services.GetEmailService()
	for _, u := range users {
		err = es.SendEmail(u.Email, "deletedServer", map[string]interface{}{
			"Server": server,
		}, true)
		if err != nil {
			//since we don't want to tell the user it failed, we'll log and move on
			logging.Error.Printf("Error sending email: %s\n", err)
		}
	}

	c.Status(http.StatusNoContent)
}

// @Summary Gets all users for a server
// @Success 200 {object} []models.UserPermissionsView
// @Param id path string true "Server ID"
// @Param email path string true "Email"
// @Router /api/servers/{id}/user [get]
// @Router /api/servers/{id}/user/{email} [get]
// @Security OAuth2Application[server.users.view]
func getServerUsers(c *gin.Context) {
	var err error
	db := middleware.GetDatabase(c)
	ps := &services.Permission{DB: db}

	server := getServerFromGin(c)

	email := c.Param("email")

	var perms []*models.Permissions
	if email != "" {
		us := &services.User{DB: db}
		var user *models.User
		user, err = us.GetByEmail(email)
		if user == nil || errors.Is(err, gorm.ErrRecordNotFound) {
			response.HandleError(c, err, http.StatusNotFound)
			return
		}
		var p *models.Permissions
		p, err = ps.GetForUserAndServer(user.ID, server.Identifier)
		if p != nil {
			perms = []*models.Permissions{p}
		}
	} else {
		perms, err = ps.GetForServer(server.Identifier)
	}

	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	users := map[*models.User][]*pufferpanel.Scope{}

	for _, v := range perms {
		p := make([]*pufferpanel.Scope, 0)
		for z, r := range users {
			if v.User.ID == z.ID {
				//this is the user
				p = r
				break
			}
		}
		p = append(p, v.Scopes...)

		found := false
		for z, _ := range users {
			if v.User.ID == z.ID {
				//this is the user
				users[z] = p
				found = true
				break
			}
		}
		if !found {
			users[&v.User] = p
		}
	}

	data := make([]*models.UserPermissionsView, 0)
	for k, v := range users {
		data = append(data, &models.UserPermissionsView{
			Username: k.Username,
			Email:    k.Email,
			Scopes:   v,
		})
	}

	c.JSON(http.StatusOK, data)
}

// @Summary Edits access to a server
// @Success 204 {object} nil
// @Param id path string true "Server ID"
// @Param email path string true "Email of user"
// @Param permissions body models.PermissionView true "New permissions to apply"
// @Router /api/servers/{id}/users/{email} [put]
// @Security OAuth2Application[server.users.edit]
func editServerUser(c *gin.Context) {
	var err error
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}
	ps := &services.Permission{DB: db}

	email := c.Param("email")
	username := c.Param("username")
	if email == "" && username == "" {
		return
	}

	perms := &models.PermissionView{}
	err = c.BindJSON(perms)
	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	server := getServerFromGin(c)

	currentUser := c.MustGet("user").(*models.User)
	currentPerms, err := ps.GetForUserAndServer(currentUser.ID, server.Identifier)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	currentGlobalPerms, err := ps.GetForUserAndServer(currentUser.ID, "")
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	var registerToken string
	var user *models.User
	if email != "" {
		user, err = us.GetByEmail(email)
	} else {
		user, err = us.Get(username)
	}

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) && response.HandleError(c, err, http.StatusInternalServerError) {
		return
	} else if errors.Is(err, gorm.ErrRecordNotFound) {
		if email == "" {
			response.HandleError(c, err, http.StatusBadRequest)
			return
		}
		//we need to create the user here, since it's a new email we've not seen

		un, err := uuid.NewV4()
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}
		user = &models.User{
			Username: un.String(),
			Email:    email,
		}
		token, err := uuid.NewV4()
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}
		registerToken = token.String()
		err = user.SetPassword(registerToken)
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}

		err = us.Create(user)
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}
	}

	existing, err := ps.GetForUserAndServer(user.ID, server.Identifier)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	var firstTimeAccess = false
	if existing.ID == 0 {
		firstTimeAccess = true
	}

	//update perms to match this "setup", but not stomp over what the user can't change
	if pufferpanel.ContainsScope(currentPerms.Scopes, pufferpanel.ScopeServerAdmin) || pufferpanel.ContainsScope(currentGlobalPerms.Scopes, pufferpanel.ScopeServerAdmin) || pufferpanel.ContainsScope(currentGlobalPerms.Scopes, pufferpanel.ScopeAdmin) {
		existing.Scopes = perms.Scopes
	} else {
		allowedScopes := pufferpanel.Union(existing.Scopes, currentPerms.Scopes)
		//update perms to match this "setup", but not stomp over what the user can't change
		replacement := pufferpanel.UpdateScopesWhereGranted(existing.Scopes, allowedScopes, currentPerms.Scopes)
		existing.Scopes = replacement
	}

	err = ps.UpdatePermissions(existing)

	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	if response.HandleError(c, db.Commit().Error, http.StatusInternalServerError) {
		return
	}

	//now we can send emails to the people
	if firstTimeAccess {
		es := services.GetEmailService()
		err = es.SendEmail(user.Email, "addedToServer", map[string]interface{}{
			"Server":        server,
			"RegisterToken": registerToken,
			"Email":         user.Email,
		}, true)
		if err != nil {
			//since we don't want to tell the user it failed, we'll log and move on
			logging.Error.Printf("Error sending email: %s\n", err)
		}
	}

	c.Status(http.StatusNoContent)
}

// @Summary Removes access to a server
// @Success 204 {object} nil
// @Param id path string true "Server ID"
// @Param email path string true "Email of user"
// @Router /api/servers/{id}/users/{email} [delete]
// @Security OAuth2Application[server.users.delete]
func removeServerUser(c *gin.Context) {
	var err error
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}
	ps := &services.Permission{DB: db}

	email := c.Param("email")
	username := c.Param("username")
	if email == "" && username == "" {
		return
	}

	server := getServerFromGin(c)

	var user *models.User
	if email != "" {
		user, err = us.GetByEmail(email)
	} else {
		user, err = us.Get(username)
	}

	if err != nil && response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	perms, err := ps.GetForUserAndServer(user.ID, server.Identifier)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	err = ps.Remove(perms)

	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	if response.HandleError(c, db.Commit().Error, http.StatusInternalServerError) {
		return
	}

	es := services.GetEmailService()
	err = es.SendEmail(user.Email, "removedFromServer", map[string]interface{}{
		"Server": server,
	}, true)
	if err != nil {
		//since we don't want to tell the user it failed, we'll log and move on
		logging.Error.Printf("Error sending email: %s\n", err)
	}

	c.Status(http.StatusNoContent)
}

// @Summary Rename server
// @Description Renames a server
// @Success 204 {object} nil
// @Param id path string true "Server ID"
// @Param name path string true "New server name"
// @Router /api/servers/{id}/name/{name} [put]
// @Security OAuth2Application[server.name.edit]
func renameServer(c *gin.Context) {
	var err error

	server := getServerFromGin(c)

	name := c.Param("name")
	t, exist := c.Get("db")
	if !exist {
		logging.Error.Printf("getting server for rename with err `%s`", err)
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	db, ok := t.(*gorm.DB)
	if !ok {
		response.HandleError(c, pufferpanel.ErrUnknownError, http.StatusInternalServerError)
		return
	}
	ss := &services.Server{DB: db}

	server.Name = name
	err = ss.Update(server)
	if err != nil {
		logging.Error.Printf("renaming server with err `%s`", err)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	c.Status(http.StatusNoContent)
}

// @Summary Update server data
// @Description Updates a server's set of variables
// @Success 202 {object} nil
// @Param id path string true "Server ID"
// @Param server body map[string]interface{} true "Server variables"
// @Router /api/servers/{id}/data [post]
// @Security OAuth2Application[server.data.edit]
func editServerData(c *gin.Context) {
	proxyServerRequest(c)
}

// @Summary Update server data with admin level rights
// @Description Updates a server's set of variables
// @Success 202 {object} nil
// @Param id path string true "Server ID"
// @Param server body map[string]interface{} true "Server variables"
// @Router /api/servers/{id}/data [put]
// @Security OAuth2Application[server.data.edit.admin]
func editServerDataAdmin(c *gin.Context) {
	server := getServerFromGin(c)

	//clone request body, so we can re-set it for the proxy call
	useHere := &bytes.Buffer{}
	useThere := &bytes.Buffer{}

	multi := io.MultiWriter(useHere, useThere)
	_, err := io.Copy(multi, c.Request.Body)
	if err != nil && response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	_ = c.Request.Body.Close()
	c.Request.Body = io.NopCloser(useThere)

	var postBody map[string]interface{}
	err = json.NewDecoder(useHere).Decode(&postBody)
	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	dirty := false
	port, exist := postBody["port"]
	if exist {
		portVal, err := cast.ToUint16E(port)
		if response.HandleError(c, err, http.StatusBadRequest) {
			return
		}
		server.Port = portVal
		dirty = true
	}

	ip, exist := postBody["ip"]
	if exist {
		if response.HandleError(c, err, http.StatusBadRequest) {
			return
		}
		server.IP = cast.ToString(ip)
		dirty = true
	}

	if dirty {
		db := middleware.GetDatabase(c)
		ss := &services.Server{DB: db}
		err = ss.Update(server)
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}
	}

	proxyServerRequest(c)
}

func getFromData(variables map[string]pufferpanel.Variable, key string) (result interface{}, exists bool) {
	for k, v := range variables {
		if k == key {
			return v.Value, true
		}
	}
	return nil, false
}

func getFromDataOrDefault(variables map[string]pufferpanel.Variable, key string, val interface{}) (interface{}, error) {
	res, exists := getFromData(variables, key)

	if exists {
		return pufferpanel.Convert(res, val)
	}

	return val, nil
}

func proxyServerRequest(c *gin.Context) {
	db := middleware.GetDatabase(c)
	ns := &services.Node{DB: db}

	resolvedPath := "/daemon/server/" + strings.TrimPrefix(c.Request.URL.Path, "/api/servers/")
	if c.Request.URL.RawQuery != "" {
		resolvedPath += "?" + c.Request.URL.RawQuery
	}

	user := c.MustGet("user").(*models.User)
	server := c.MustGet("server").(*models.Server)
	node := &server.Node

	ts, err := services.NewTokenService()
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	token, err := ts.GenerateRequest()
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	//switch to our token for auth
	c.Request.Header.Set("Authorization", "Bearer "+token)

	if c.IsWebsocket() {
		//for websocket, nuke the query params to avoid trying to escalate
		resolvedPath = strings.SplitN(resolvedPath, "?", 2)[0]
		if !strings.HasPrefix(resolvedPath, "/") {
			resolvedPath = "/" + resolvedPath
		}

		permService := &services.Permission{DB: db}
		perms, err := permService.GetForUserAndServer(user.ID, server.Identifier)
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}

		scopes := perms.Scopes

		perms, err = permService.GetForUserAndServer(user.ID, "")
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}

		scopes = append(scopes, perms.Scopes...)

		//add the params we can grant for this request
		var params []string
		if pufferpanel.ContainsScope(scopes, pufferpanel.ScopeServerConsole) {
			params = append(params, "console")
		}
		if pufferpanel.ContainsScope(scopes, pufferpanel.ScopeServerStatus) {
			params = append(params, "status")
		}
		if pufferpanel.ContainsScope(scopes, pufferpanel.ScopeServerStats) {
			params = append(params, "stats")
		}
		resolvedPath = resolvedPath + "?" + strings.Join(params, "&")

		proxySocketRequest(c, resolvedPath, ns, node)
	} else {
		proxyHttpRequest(c, resolvedPath, ns, node)
	}

	c.Abort()
}

func proxyHttpRequest(c *gin.Context, path string, ns *services.Node, node *models.Node) {
	callResponse, err := ns.CallNode(node, c.Request.Method, path, c.Request.Body, c.Request.Header)

	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	defer pufferpanel.CloseResponse(callResponse)

	//Even though apache isn't going to be in place, we can't set certain headers
	newHeaders := make(map[string]string)
	for k, v := range callResponse.Header {
		switch k {
		case "Transfer-Encoding":
		case "Content-Type":
		case "Content-Length":
			continue
		default:
			newHeaders[k] = strings.Join(v, ", ")
		}
	}

	c.DataFromReader(callResponse.StatusCode, callResponse.ContentLength, callResponse.Header.Get("Content-Type"), callResponse.Body, newHeaders)
	c.Abort()
}

func proxySocketRequest(c *gin.Context, path string, ns *services.Node, node *models.Node) {
	if node.IsLocal() {
		//have gin handle the request again, but send it to daemon instead
		//c.Request.URL.Path = path
		addr, err := url.Parse(path)
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}
		c.Request.URL = addr
		pufferpanel.Engine.HandleContext(c)
	} else {
		err := ns.OpenSocket(node, path, c.Writer, c.Request)
		response.HandleError(c, err, http.StatusInternalServerError)
	}
	c.Abort()
}

func getServerFromGin(c *gin.Context) *models.Server {
	return c.MustGet("server").(*models.Server)
}
