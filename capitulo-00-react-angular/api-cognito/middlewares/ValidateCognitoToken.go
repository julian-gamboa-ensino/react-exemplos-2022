package middlewares

import (
	"crypto/rsa"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/big"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

// Estrutura para armazenar as chaves JWKS
type JWK struct {
	Keys []struct {
		Kid string `json:"kid"`
		Kty string `json:"kty"`
		Alg string `json:"alg"`
		Use string `json:"use"`
		N   string `json:"n"`
		E   string `json:"e"`
	} `json:"keys"`
}

// Função que busca as chaves públicas do AWS Cognito
func getCognitoJWKS(jwksURL string) (*JWK, error) {
	resp, err := http.Get(jwksURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var jwk JWK
	err = json.Unmarshal(body, &jwk)
	if err != nil {
		return nil, err
	}

	return &jwk, nil
}

// Função que valida o token utilizando as chaves públicas (JWKS)
func ValidateCognitoToken(info string) gin.HandlerFunc {
	return func(c *gin.Context) {
		jwksURL := "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_WPgUGyt78/.well-known/jwks.json"

		fmt.Println(info)

		// Recuperar o token analisado do contexto
		parsedToken, exists := c.Get("parsedToken")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token not parsed"})
			c.Abort()
			return
		}

		token := parsedToken.(*jwt.Token)

		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unexpected signing method"})
			c.Abort()
			return
		}

		jwkSet, err := getCognitoJWKS(jwksURL)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get JWKS"})
			c.Abort()
			return
		}

		kid := token.Header["kid"].(string)

		fmt.Println("KID:", kid)

		var publicKey *rsa.PublicKey

		for _, key := range jwkSet.Keys {
			if key.Kid == kid {
				// Decode N and E from hex to byte arrays
				nBytes, err := hex.DecodeString(key.N)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode key N: " + err.Error()})
					c.Abort()
					return
				}

				eBytes, err := hex.DecodeString(key.E)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode key E: " + err.Error()})
					c.Abort()
					return
				}

				n := new(big.Int).SetBytes(nBytes)
				e := int(new(big.Int).SetBytes(eBytes).Int64())

				publicKey = &rsa.PublicKey{N: n, E: e}
				break
			}
		}

		if publicKey == nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Public key not found"})
			c.Abort()
			return
		}

		// Validar o token com a chave pública e extrair as claims
		claims := jwt.MapClaims{}
		_, err = jwt.ParseWithClaims(token.Raw, claims, func(token *jwt.Token) (interface{}, error) {
			return publicKey, nil
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}
		c.Next()
	}
}
