package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/pufferpanel/"
)

func AddVersionHeader(c *gin.Context) {
	c.Header("X-API-Version", pufferpanel.Version)
}
