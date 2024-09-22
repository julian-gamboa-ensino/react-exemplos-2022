package middlewares

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func CheckGroup(info string, requiredGroup string) gin.HandlerFunc {
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

		// Verificar se o cognito:groups está presente nas claims
		groupsClaim, ok := claims["cognito:groups"]
		if !ok {
			c.JSON(http.StatusForbidden, gin.H{"error": "Claim 'cognito:groups' not found"})
			c.Abort()
			return
		}

		// Verificar se o grupo esperado está presente na claim cognito:groups
		groupFound := false
		if groupsArray, ok := groupsClaim.([]interface{}); ok {
			for _, group := range groupsArray {
				if groupStr, ok := group.(string); ok && groupStr == requiredGroup {
					groupFound = true
					break
				}
			}
		}

		if !groupFound {
			c.JSON(http.StatusForbidden, gin.H{"error": "Acesso negado"})
			c.Abort()
			return
		}

		fmt.Println("Grupo válido:", groupsClaim)
		c.Next()
	}
}
