
from agents import Agent, Runner, OpenAIChatCompletionsModel, set_tracing_disabled
from  openai import AsyncOpenAI

from config.settings import settings

BASE_URL = settings.base_url
MODEL_NAME = settings.model_name


if not BASE_URL or not MODEL_NAME:
    raise ValueError("BASE_URL and MODEL_NAME must be set in environment variables.")

set_tracing_disabled(True)
client = AsyncOpenAI(base_url=BASE_URL, api_key="")
model = OpenAIChatCompletionsModel(model=MODEL_NAME, openai_client=client)

agent = Agent(name="Assistant", instructions="You are a helpful assistant", model=model)

result = Runner.run_sync(agent, "Write a haiku about recursion in programming.")
print(result.final_output)