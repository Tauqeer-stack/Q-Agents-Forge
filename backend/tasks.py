from crewai import Task

def get_research_task(agent, company_name):
    return Task(
        description=f"""Conduct a comprehensive research on {company_name}. 
        Find their recent news, mission statement, primary business model, 
        and potential pain points their customers face.""",
        expected_output="A structured report highlighting key business insights, potential pain points, and strategic opportunities.",
        agent=agent
    )