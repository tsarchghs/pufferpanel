package api

import (
	"github.com/gin-gonic/gin"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/middleware"
	"github.com/tsarchghs/pufferpanel/models"
	"github.com/tsarchghs/pufferpanel/response"
	"github.com/tsarchghs/pufferpanel/services"
	"net/http"
)

func registerUserSettings(g *gin.RouterGroup) {
	g.Handle("GET", "", middleware.RequiresPermission(pufferpanel.ScopeLogin), getUserSettings)
	g.Handle("PUT", "/:key", middleware.RequiresPermission(pufferpanel.ScopeLogin), setUserSetting)
	g.Handle("OPTIONS", "", response.CreateOptions("GET", "PUT"))
}

// @Summary Get a user setting
// @Description Gets all settings specific to the current user
// @Success 200 {object} models.UserSettingsView
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Router /api/usersettings [get]
// @Security OAuth2Application[login]
func getUserSettings(c *gin.Context) {
	db := middleware.GetDatabase(c)
	uss := &services.UserSettings{DB: db}

	t, exists := c.Get("user")
	user, ok := t.(*models.User)

	if !exists || !ok {
		response.HandleError(c, pufferpanel.ErrUnknownError, http.StatusInternalServerError)
		return
	}

	results, err := uss.GetAllForUser(user.ID)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	c.JSON(http.StatusOK, results)
}

// @Summary Update a user setting
// @Description Updates the value of a user setting
// @Success 204 {object} nil
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Param key path string true "The config key"
// @Param value body models.ChangeUserSetting true "The new value for the setting"
// @Router /api/usersettings/{key} [PUT]
// @Security OAuth2Application[login]
func setUserSetting(c *gin.Context) {
	key := c.Param("key")
	db := middleware.GetDatabase(c)
	uss := &services.UserSettings{DB: db}

	t, exists := c.Get("user")
	user, ok := t.(*models.User)

	if !exists || !ok {
		response.HandleError(c, pufferpanel.ErrUnknownError, http.StatusInternalServerError)
		return
	}

	var model models.ChangeUserSetting
	if err := c.BindJSON(&model); response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	err := uss.Update(&models.UserSetting{
		Key:    key,
		UserID: user.ID,
		Value:  model.Value,
	})

	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	c.Status(http.StatusNoContent)
}
