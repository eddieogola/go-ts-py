import {
  Agent,
  OpenAIChatCompletionsModel,
  run,
  getGlobalTraceProvider,
} from "@openai/agents";
import OpenAI from "openai";

const baseURL = process.env.BASE_URL;
const modelName = process.env.MODEL_NAME;

if (!baseURL || !modelName) {
  throw new Error(
    "Please set the BASE_URL and MODEL_NAME environment variables."
  );
}

const traceProvider = getGlobalTraceProvider();

if (traceProvider) {
  traceProvider.setDisabled(true);
}
const client = new OpenAI({
  apiKey: "sk-dummy-key",
  baseURL: baseURL,
});

const model = new OpenAIChatCompletionsModel(client, modelName);

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
