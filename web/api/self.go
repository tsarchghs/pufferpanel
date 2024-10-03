package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	uuid "github.com/gofrs/uuid/v5"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/logging"
	"github.com/tsarchghs/pufferpanel/middleware"
	"github.com/tsarchghs/pufferpanel/models"
	"github.com/tsarchghs/pufferpanel/response"
	"github.com/tsarchghs/pufferpanel/services"
)

func registerSelf(g *gin.RouterGroup) {
	g.Handle("GET", "", middleware.RequiresPermission(pufferpanel.ScopeLogin), getSelf)
	g.Handle("PUT", "", middleware.RequiresPermission(pufferpanel.ScopeSelfEdit), updateSelf)
	g.Handle("OPTIONS", "", response.CreateOptions("GET", "PUT"))

	g.Handle("GET", "/otp", middleware.RequiresPermission(pufferpanel.ScopeSelfEdit), getOtpStatus)
	g.Handle("POST", "/otp", middleware.RequiresPermission(pufferpanel.ScopeSelfEdit), startOtpEnroll)
	g.Handle("PUT", "/otp", middleware.RequiresPermission(pufferpanel.ScopeSelfEdit), validateOtpEnroll)
	g.Handle("OPTIONS", "/otp", response.CreateOptions("GET", "POST", "PUT"))

	g.Handle("DELETE", "/otp/:token", middleware.RequiresPermission(pufferpanel.ScopeSelfEdit), disableOtp)
	g.Handle("OPTIONS", "/otp/:token", response.CreateOptions("DELETE"))

	g.Handle("GET", "/oauth2", middleware.RequiresPermission(pufferpanel.ScopeSelfClients), getPersonalOAuth2Clients)
	g.Handle("POST", "/oauth2", middleware.RequiresPermission(pufferpanel.ScopeSelfClients), createPersonalOAuth2Client)
	g.Handle("OPTIONS", "/oauth2", response.CreateOptions("GET", "POST"))

	g.Handle("DELETE", "/oauth2/:clientId", middleware.RequiresPermission(pufferpanel.ScopeSelfClients), deletePersonalOAuth2Client)
	g.Handle("OPTIONS", "/oauth2/:clientId", response.CreateOptions("DELETE"))
}

// @Summary Get your user info
// @Description Gets the user information of the current user
// @Success 200 {object} models.UserView
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 403 {object} pufferpanel.ErrorResponse
// @Failure 404 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Router /api/self [get]
// @Security OAuth2Application[login]
func getSelf(c *gin.Context) {
	user := c.MustGet("user").(*models.User)

	c.JSON(http.StatusOK, models.FromUser(user))
}

// @Summary Update your user
// @Description Update user information for your current user
// @Success 204 {object} nil
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 403 {object} pufferpanel.ErrorResponse
// @Failure 404 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Param user body models.UserView true "User information"
// @Router /api/self [PUT]
// @Security OAuth2Application[self.edit]
func updateSelf(c *gin.Context) {
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}

	t, exist := c.Get("user")
	user, ok := t.(*models.User)

	if !exist || !ok {
		response.HandleError(c, pufferpanel.ErrUnknownError, http.StatusInternalServerError)
		return
	}

	var viewModel models.UserView
	if err := c.BindJSON(&viewModel); response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	if err := viewModel.Valid(true); response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	if viewModel.Password == "" {
		response.HandleError(c, pufferpanel.ErrFieldRequired("password"), http.StatusBadRequest)
		return
	}

	if !us.IsValidCredentials(user, viewModel.Password) {
		response.HandleError(c, pufferpanel.ErrInvalidCredentials, http.StatusInternalServerError)
		return
	}

	var oldEmail string
	if user.Email != viewModel.Email {
		oldEmail = user.Email
	}

	viewModel.CopyToModel(user)

	passwordChanged := false
	if viewModel.NewPassword != "" {
		if !us.IsSecurePassword(viewModel.NewPassword) {
			response.HandleError(c, pufferpanel.ErrPasswordRequirements, http.StatusBadRequest)
			return
		}

		passwordChanged = true
		err := user.SetPassword(viewModel.NewPassword)
		if response.HandleError(c, err, http.StatusInternalServerError) {
			return
		}
	}

	if err := us.Update(user); response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	if oldEmail != "" {
		err := services.GetEmailService().SendEmail(oldEmail, "emailChanged", map[string]interface{}{
			"NEW_EMAIL": user.Email,
		}, true)
		if err != nil {
			logging.Error.Printf("Error sending email: %s\n", err)
		}
	}

	if passwordChanged {
		err := services.GetEmailService().SendEmail(user.Email, "passwordChanged", nil, true)
		if err != nil {
			logging.Error.Printf("Error sending email: %s\n", err)
		}
	}

	c.Status(http.StatusNoContent)
}

func getOtpStatus(c *gin.Context) {
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}

	t, exist := c.Get("user")
	user, ok := t.(*models.User)

	if !exist || !ok {
		response.HandleError(c, pufferpanel.ErrUnknownError, http.StatusInternalServerError)
		return
	}

	otpEnabled, err := us.GetOtpStatus(user.ID)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"otpEnabled": otpEnabled,
	})
}

func startOtpEnroll(c *gin.Context) {
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}

	t, exist := c.Get("user")
	user, ok := t.(*models.User)

	if !exist || !ok {
		response.HandleError(c, pufferpanel.ErrUnknownError, http.StatusInternalServerError)
		return
	}

	secret, img, err := us.StartOtpEnroll(user.ID)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"secret": secret,
		"img":    img,
	})
}

func validateOtpEnroll(c *gin.Context) {
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}

	t, exist := c.Get("user")
	user, ok := t.(*models.User)

	if !exist || !ok {
		response.HandleError(c, pufferpanel.ErrUnknownError, http.StatusInternalServerError)
		return
	}

	request := &ValidateOtpRequest{}

	err := c.BindJSON(request)
	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	err = us.ValidateOtpEnroll(user.ID, request.Token)
	if err == pufferpanel.ErrInvalidCredentials {
		response.HandleError(c, err, http.StatusBadRequest)
		return
	}
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	err = services.GetEmailService().SendEmail(user.Email, "otpEnabled", nil, true)
	if err != nil {
		logging.Error.Printf("Error sending email: %s\n", err)
	}
	c.Status(http.StatusNoContent)
}

func disableOtp(c *gin.Context) {
	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}

	t, exist := c.Get("user")
	user, ok := t.(*models.User)

	if !exist || !ok {
		response.HandleError(c, pufferpanel.ErrUnknownError, http.StatusInternalServerError)
		return
	}

	err := us.DisableOtp(user.ID, c.Param("token"))
	if err == pufferpanel.ErrInvalidCredentials {
		response.HandleError(c, err, http.StatusBadRequest)
		return
	}
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	err = services.GetEmailService().SendEmail(user.Email, "otpDisabled", nil, true)
	if err != nil {
		logging.Error.Printf("Error sending email: %s\n", err)
	}
	c.Status(http.StatusNoContent)
}

// @Summary Gets registered OAuth2 clients
// @Description Gets known OAuth2 clients the logged-in user has registered
// @Success 200 {object} []models.Client
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 403 {object} pufferpanel.ErrorResponse
// @Failure 404 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Router /api/self/oauth2 [GET]
// @Security OAuth2Application[self.clients]
func getPersonalOAuth2Clients(c *gin.Context) {
	user := c.MustGet("user").(*models.User)

	db := middleware.GetDatabase(c)
	os := &services.OAuth2{DB: db}

	clients, err := os.GetForUser(user.ID)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	c.JSON(http.StatusOK, &clients)
}

// @Summary Create an account-level OAuth2 client
// @Success 200 {object} models.Client
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 403 {object} pufferpanel.ErrorResponse
// @Failure 404 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Param client body models.Client false "Information for the client to create"
// @Router /api/self/oauth2 [POST]
// @Security OAuth2Application[self.clients]
func createPersonalOAuth2Client(c *gin.Context) {
	user := c.MustGet("user").(*models.User)

	db := middleware.GetDatabase(c)
	os := &services.OAuth2{DB: db}

	var request models.Client
	err := c.BindJSON(&request)
	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	id, err := uuid.NewV4()
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}
	client := &models.Client{
		ClientId:    id.String(),
		UserId:      user.ID,
		Name:        request.Name,
		Description: request.Description,
	}

	secret, err := pufferpanel.GenerateRandomString(36)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	client.ClientSecret = secret

	err = client.SetClientSecret(secret)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	err = os.Create(client)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	err = services.GetEmailService().SendEmail(user.Email, "oauthCreated", nil, true)
	if err != nil {
		logging.Error.Printf("Error sending email: %s\n", err)
	}

	c.JSON(http.StatusOK, client)
}

// @Summary Deletes an account-level OAuth2 client
// @Success 204 {object} nil
// @Failure 400 {object} pufferpanel.ErrorResponse
// @Failure 403 {object} pufferpanel.ErrorResponse
// @Failure 404 {object} pufferpanel.ErrorResponse
// @Failure 500 {object} pufferpanel.ErrorResponse
// @Param id path string true "Information for the client to create"
// @Router /api/self/oauth2/{id} [DELETE]
// @Security OAuth2Application[self.clients]
func deletePersonalOAuth2Client(c *gin.Context) {
	user := c.MustGet("user").(*models.User)
	clientId := c.Param("clientId")

	db := middleware.GetDatabase(c)
	os := &services.OAuth2{DB: db}

	client, err := os.Get(clientId)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	//ensure the client id is specific for this server, and this user
	if client.UserId != user.ID {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	err = os.Delete(client.ClientId)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	err = services.GetEmailService().SendEmail(user.Email, "oauthDeleted", nil, true)
	if err != nil {
		logging.Error.Printf("Error sending email: %s\n", err)
	}
	c.Status(http.StatusNoContent)
}

type ValidateOtpRequest struct {
	Token string `json:"token"`
}
