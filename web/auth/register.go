package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pufferpanel/"
	"github.com/tsarchghs/pufferpanel/config"
	"github.com/tsarchghs/pufferpanel/logging"
	"github.com/tsarchghs/pufferpanel/middleware"
	"github.com/tsarchghs/pufferpanel/models"
	"github.com/tsarchghs/pufferpanel/response"
	"github.com/tsarchghs/pufferpanel/services"
	"gopkg.in/go-playground/validator.v9"
)

func RegisterPost(c *gin.Context) {
	if !config.RegistrationEnabled.Value() {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	db := middleware.GetDatabase(c)
	us := &services.User{DB: db}

	request := &registerRequestData{}
	err := c.BindJSON(request)

	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	validate := validator.New()
	err = validate.Struct(request)
	if response.HandleError(c, err, http.StatusBadRequest) {
		return
	}

	if !us.IsSecurePassword(request.Password) {
		response.HandleError(c, pufferpanel.ErrPasswordRequirements, http.StatusBadRequest)
		return
	}

	user := &models.User{Username: request.Username, Email: request.Email}
	err = user.SetPassword(request.Password)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	err = us.Create(user)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	ps := &services.Permission{DB: db}
	perms, err := ps.GetForUserAndServer(user.ID, "")
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	//perms.ViewServer = true
	perms.Scopes = []*pufferpanel.Scope{pufferpanel.ScopeLogin}

	err = ps.UpdatePermissions(perms)
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}

	err = services.GetEmailService().SendEmail(user.Email, "accountCreation", nil, true)
	if err != nil {
		logging.Error.Printf("Error sending email: %s", err.Error())
	}

	createSession(c, user)
}

type registerRequestData struct {
	Username string `json:"username" validate:"required,printascii,min=5,max=100"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}
