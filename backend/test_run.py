from agents import researcher
from tasks import get_research_task
from crewai import Crew

# Define a simple crew
research_crew = Crew(
    agents=[researcher],
    tasks=[get_research_task(researcher, "Apple")],
    verbose=True
)

# Run it
print("Starting research...")
result = research_crew.kickoff()
print("--- Research Result ---")
print(result)