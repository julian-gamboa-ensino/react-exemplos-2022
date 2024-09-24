package main

import (
	"net/http"

	"aws-cognito/middlewares"

	"github.com/gin-gonic/gin"
)

func middleware(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Success"})
}

func main() {
	r := gin.Default()

	r.GET("/protected",
		middlewares.ParseJWT(),
		middlewares.ValidateCognitoToken("Verificando as Chaves"),
		middlewares.JwtExpirationCheck("Verificando a expiração do token"),
		middlewares.CheckGroup("Verificando o grupo passado como argumento", "angular17"),
		middleware,
	)

	r.Run(":8080")
}
