package api

import (
	"github.com/gin-gonic/gin"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/middleware"
	"github.com/tsarchghs/pufferpanel/models"
	"github.com/tsarchghs/pufferpanel/response"
	"github.com/tsarchghs/pufferpanel/services"
	"github.com/spf13/cast"
	"net/http"
)

func registerUsers(g *gin.RouterGroup) {
	g.Handle("GET", "", middleware.RequiresPermission(pufferpanel.ScopeUserInfoSearch), searchUsers)
	g.Handle("POST", "", middleware.RequiresPermission(pufferpanel.ScopeUserInfoEdit), createUser)
	g.Handle("OPTIONS", "", response.CreateOptions("GET", "POST"))

	g.Handle("GET", "/:id", middleware.RequiresPermission(pufferpanel.ScopeUserInfoView), getUser)
	g.Handle("POST", "/:id", middleware.RequiresPermission(pufferpanel.ScopeUserInfoEdit), updateUser)
	g.Handle("DELETE", "/:id", middleware.RequiresPermission(pufferpanel.ScopeUserInfoEdit), deleteUser)
	g.Handle("OPTIONS", "/:id", response.CreateOptions("GET", "POST", "DELETE"))

	g.Handle("GET", "/:id/perms", middleware.RequiresPermission(pufferpanel.ScopeUserPermsView), getUserPerms)
	g.Handle("PUT", "/:id/perms", middleware.RequiresPermission(pufferpanel.ScopeUserPermsEdit), setUserPerms)
	g.Handle("OPTIONS", "/:id/perms", response.CreateOptions("PUT", "GET"))
}

// @Summary Get users
// @Description Gets users, and allowing for filtering of users. * is a wildcard that can be used for text inputs
// @Success 200 {object} models.UserSearchResponse
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 403 {object} pufferpanel.ErrorResponse
// @Failure 404 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Param body body models.UserSearch true "Filters to search on"
// @Router /api/users [get]
// @Security OAuth2Application[users.info.search]
func searchUsers(c *gin.Context) {
	var err error
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}

	search := newUserSearch()
	err = c.ShouldBind(search)
	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	if search.PageLimit > MaxPageSize {
		search.PageLimit = MaxPageSize
	}

	var results []*models.User
	var total int64
	if results, total, err = us.Search(search.Username, search.Email, search.PageLimit, search.Page); response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	c.JSON(http.StatusOK, &models.UserSearchResponse{
		Users: models.FromUsers(results),
		Metadata: &pufferpanel.Metadata{Paging: &pufferpanel.Paging{
			Page:    search.Page,
			Size:    search.PageLimit,
			MaxSize: MaxPageSize,
			Total:   total,
		}},
	})
}

// @Summary Create user
// @Success 200 {object} models.UserView
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 403 {object} pufferpanel.ErrorResponse
// @Failure 404 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Param body body models.UserView true "New user information"
// @Router /api/users [post]
// @Security OAuth2Application[users.info.edit]
func createUser(c *gin.Context) {
	var err error
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}

	var viewModel models.UserView
	if err = c.BindJSON(&viewModel); response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	if err = viewModel.Valid(false); response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	if viewModel.Password == "" {
		response.HandleError(c, pufferpanel.ErrFieldRequired("password"), http.StatusBadRequest)
		return
	}

	user := &models.User{}
	viewModel.CopyToModel(user)

	if err = us.Create(user); response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	resultModel := models.FromUser(user)

	c.JSON(http.StatusOK, resultModel)
}

// @Summary Get a user
// @Success 200 {object} models.UserView
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 403 {object} pufferpanel.ErrorResponse
// @Failure 404 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Param id path uint true "User ID"
// @Router /api/users/{id} [get]
// @Security OAuth2Application[users.info.view]
func getUser(c *gin.Context) {
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}

	var err error
	var id uint
	if id, err = cast.ToUintE(c.Param("id")); err != nil {
		response.HandleError(c, err, http.StatusBadRequest)
		return
	}

	user, err := us.GetById(id)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	c.JSON(http.StatusOK, models.FromUser(user))
}

// @Summary Update user
// @Success 204 {object} nil
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 403 {object} pufferpanel.ErrorResponse
// @Failure 404 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Param id path uint true "User ID"
// @Param body body models.UserView true "New user information"
// @Router /api/users/{id} [post]
// @Security OAuth2Application[users.info.edit]
func updateUser(c *gin.Context) {
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}

	var err error
	var id uint
	if id, err = cast.ToUintE(c.Param("id")); err != nil {
		response.HandleError(c, err, http.StatusBadRequest)
		return
	}

	var viewModel models.UserView
	if err := c.BindJSON(&viewModel); response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	if err := viewModel.Valid(true); response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	user, err := us.GetById(id)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	viewModel.CopyToModel(user)

	if err = us.Update(user); response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	c.Status(http.StatusNoContent)
}

// @Summary Delete user
// @Success 204 {object} nil
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 403 {object} pufferpanel.ErrorResponse
// @Failure 404 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Param id path uint true "User ID"
// @Router /api/users/{id} [delete]
// @Security OAuth2Application[users.info.edit]
func deleteUser(c *gin.Context) {
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}

	var err error
	var id uint
	if id, err = cast.ToUintE(c.Param("id")); err != nil {
		response.HandleError(c, err, http.StatusBadRequest)
		return
	}

	user, err := us.GetById(id)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	if err = us.Delete(user); response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	c.Status(http.StatusNoContent)
}

// @Summary Gets user permissions
// @Success 200 {object} models.PermissionView
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 403 {object} pufferpanel.ErrorResponse
// @Failure 404 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Param id path uint true "User ID"
// @Router /api/users/{id}/perms [get]
// @Security OAuth2Application[users.perms.view]
func getUserPerms(c *gin.Context) {
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}
	ps := &services.Permission{DB: db}

	var err error
	var id uint
	if id, err = cast.ToUintE(c.Param("id")); err != nil {
		response.HandleError(c, err, http.StatusBadRequest)
		return
	}

	user, err := us.GetById(id)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	perms, err := ps.GetForUserAndServer(user.ID, "")
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	c.JSON(http.StatusOK, models.FromPermission(perms))
}

// @Summary Sets user permissions
// @Success 204 {object} nil
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 403 {object} pufferpanel.ErrorResponse
// @Failure 404 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Param id path uint true "User ID"
// @Param body body models.PermissionView true "New permissions"
// @Router /api/users/{id}/perms [put]
// @Security OAuth2Application[users.perms.edit]
func setUserPerms(c *gin.Context) {
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}
	ps := &services.Permission{DB: db}

	var err error
	var id uint
	if id, err = cast.ToUintE(c.Param("id")); err != nil {
		response.HandleError(c, err, http.StatusBadRequest)
		return
	}

	viewModel := &models.PermissionView{}
	err = c.BindJSON(viewModel)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	user, err := us.GetById(id)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	perms, err := ps.GetForUserAndServer(user.ID, "")
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	//get the current user's scopes
	editorUser := c.MustGet("user").(*models.User)
	editorPerms, err := ps.GetForUserAndServer(editorUser.ID, "")
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	//admins can override, so skip our comparers
	if pufferpanel.ContainsScope(editorPerms.Scopes, pufferpanel.ScopeAdmin) {
		perms.Scopes = viewModel.Scopes
	} else {
		allowedScopes := pufferpanel.Union(viewModel.Scopes, editorPerms.Scopes)
		//update perms to match this "setup", but not stomp over what the user can't change
		replacement := pufferpanel.UpdateScopesWhereGranted(perms.Scopes, allowedScopes, editorPerms.Scopes)
		perms.Scopes = replacement
	}

	err = ps.UpdatePermissions(perms)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	c.Status(http.StatusNoContent)
}

func newUserSearch() *models.UserSearch {
	return &models.UserSearch{
		Username:  "*",
		Email:     "*",
		PageLimit: DefaultPageSize,
		Page:      1,
	}
}
