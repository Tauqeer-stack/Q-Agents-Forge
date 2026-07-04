from crewai import Agent
import os
from dotenv import load_dotenv

# Load your API keys
load_dotenv()

# Modern CrewAI approach: pass the model name as a string
researcher = Agent(
    role='Senior Research Analyst',
    goal='Uncover cutting-edge developments in AI',
    backstory='You are a seasoned researcher who likes to provide detailed insights.',
    llm="gpt-4o",  # <--- Change this to the model name string
    verbose=True,
    allow_delegation=False
)