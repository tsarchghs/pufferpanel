package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/tsarchghs/pufferpanel/models"
)

func Reauth(c *gin.Context) {
	user, _ := c.MustGet("user").(*models.User)

	createSession(c, user)

}
