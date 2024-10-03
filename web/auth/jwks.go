package auth

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/tsarchghs/pufferpanel/response"
	"github.com/tsarchghs/pufferpanel/services"
	"net/http"
)

func TokenServiceGetPublicKey(c *gin.Context) {
	ts, err := services.NewTokenService()
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}
	rawJWKS, err := ts.GetTokenStore().JSONPublic(context.Background())
	if response.HandleError(c, err, http.StatusInternalServerError) {
		return
	}
	c.JSON(http.StatusOK, rawJWKS)
}
