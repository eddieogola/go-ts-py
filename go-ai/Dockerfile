FROM golang:1.25.1-alpine3.22 AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o go-ai .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/go-ai .
CMD ["./go-ai"]