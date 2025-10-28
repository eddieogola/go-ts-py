import {
  Agent,
  OpenAIChatCompletionsModel,
  run,
  getGlobalTraceProvider,
} from "@openai/agents";
import OpenAI from "openai";

const traceProvider = getGlobalTraceProvider();

if (traceProvider) {
  traceProvider.setDisabled(true);
}
const client = new OpenAI({
  apiKey: "sk-dummy-key", // Dummy key, not used by Ollama
  baseURL: "http://localhost:12434/engines/llama.cpp/v1",
});

const model = new OpenAIChatCompletionsModel(client, "ai/gemma3"); // Replace with your Ollama model name

const agent = new Agent({
  model,
  name: "Assistant",
  instructions: "You are a helpful assistant",
});

const result = await run(
  agent,
  "Write a haiku about recursion in programming."
);

console.log(result.finalOutput);
