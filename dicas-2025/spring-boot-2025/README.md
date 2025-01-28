# Aula Prática: Spring Boot e Swagger

Este repositório contém uma aplicação Spring Boot de exemplo que demonstra como integrar o Swagger para documentar e testar APIs REST.

## Dependências

Este projeto utiliza as seguintes dependências para integrar o Swagger:

**Observação importante:** A escolha da dependência e sua versão depende da versão do Spring Boot utilizada no projeto. Consulte a documentação do Springfox e Springdoc para verificar a compatibilidade.


**Opção 1: Springfox** (versão mais antiga, mantida pela comunidade)

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version> 
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>3.0.0</version>
</dependency>