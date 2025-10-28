package main

import (
	"context"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/option"
)

func main() {
	baseUrl := os.Getenv("BASE_URL")
	modelName := os.Getenv("MODEL_NAME")

	if baseUrl == "" || modelName == "" {
		panic("BASE_URL and MODEL_NAME must be set")
	}

	client := openai.NewClient(
		option.WithAPIKey("dummyapikey"),
		option.WithBaseURL(baseUrl),
	)
	chatCompletion, err := client.Chat.Completions.New(context.TODO(), openai.ChatCompletionNewParams{
		Messages: []openai.ChatCompletionMessageParamUnion{
			openai.SystemMessage("You are a helpful assistant"),
			openai.UserMessage("Write a haiku about recursion in programming."),
		},
		Model: modelName,
	})
	if err != nil {
		panic(err.Error())
	}
	println(chatCompletion.Choices[0].Message.Content)
}
