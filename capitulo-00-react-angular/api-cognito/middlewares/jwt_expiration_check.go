package middlewares

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func JwtExpirationCheck(info string) gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println(info)

		// Recuperar o token analisado do contexto
		parsedToken, exists := c.Get("parsedToken")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token not parsed"})
			c.Abort()
			return
		}

		token := parsedToken.(*jwt.Token)
		claims := token.Claims.(jwt.MapClaims)

		// Verificar a data de expiração
		if exp, ok := claims["exp"].(float64); ok {
			expTime := time.Unix(int64(exp), 0)
			fmt.Println("Expiration Time:", expTime)

			if expTime.Before(time.Now()) {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Token expired"})
				c.Abort()
				return
			} else {
				fmt.Println("Token is still valid.")
			}
		} else {
			fmt.Println("Expiration claim not found in token.")
		}

		c.Next()
	}
}
