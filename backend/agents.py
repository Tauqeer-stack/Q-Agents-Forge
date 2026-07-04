import os
from dotenv import load_dotenv
from crewai import Agent
from langchain_openai import ChatOpenAI
from crewai_tools import SerperDevTool

# This line tells Python to load the keys from the .env file we just made
load_dotenv()

# Now your agents can safely use the keys
search_tool = SerperDevTool()
llm = ChatOpenAI(model="gpt-4o", temperature=0.7)

researcher = Agent(
    role='Senior Research Analyst',
    goal='Uncover deep insights about a target company',
    backstory="You are an expert researcher.",
    tools=[search_tool],
    verbose=True,
    allow_delegation=False,
    llm=llm
)
