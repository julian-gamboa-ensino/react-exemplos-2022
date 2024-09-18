package main

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func main() {
	r := gin.Default()

	r.GET("/protected", func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		// Analisar o token JWT
		token, _, err := new(jwt.Parser).ParseUnverified(tokenString, jwt.MapClaims{})
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		// Extrair as claims
		claims := token.Claims.(jwt.MapClaims)
		fmt.Println("Claims:", claims)

		// Exibir a data de expiração (se existir)
		if exp, ok := claims["exp"].(float64); ok {
			expTime := time.Unix(int64(exp), 0) // Converter para time.Time
			fmt.Println("Expiration Time:", expTime)

			// Comparar com o tempo atual para verificar se expirou
			if expTime.Before(time.Now()) {
				fmt.Println("Token has expired!")
			} else {
				fmt.Println("Token is still valid.")
			}
		} else {
			fmt.Println("Expiration claim not found in token.")
		}

		// Exibir o token JWT no console
		//fmt.Println(tokenString)

		// Responder com o token JWT (opcional)
		c.JSON(http.StatusOK, gin.H{"token": tokenString})
	})

	r.Run(":8080")
}
