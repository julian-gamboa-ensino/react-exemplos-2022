# Stage 1: Build
FROM golang:latest AS build

WORKDIR /app

COPY . .

RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o main .

# Stage 2: Final Image
FROM alpine:latest

WORKDIR /app

COPY --from=build /app/main /app/

CMD ["/app/main"]