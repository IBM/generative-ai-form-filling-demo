from pydantic import BaseModel, Field


class Recipe(BaseModel):
    author: str = Field(description="primary author of the recipe")
    title: str = Field(description="exact title of the document")
    publicationDate: str = Field(
        description="Date of recipe publication in the format mm/dd/yyyy"
    )
    ingredients: list[str] = Field(
        description="The ingrediants found in the recipe document needed to cook the meal"
    )
    steps: list[str] = Field(
        description="The steps found in the recipe document you need to follow in order to cook the meal"
    )


class Cuisine(BaseModel):
    id: int = Field(
        description="the id associated with the cuisines found in the context"
    )
    name: str = Field(
        description="the name associated with the cuisines found in the context"
    )


extract_template = """
    You are culinary expert, extract the following details from the provided recipe text and present them in the specified structured json output format below.
    You should only extract the title, primary author, steps, and the ingredients from the provided recipe.
    Include only the information explicitly stated in the recipe, and leave fields blank if the information is not provided. 
    Do not infer or add details beyond what is given. Only return the final json output.

    Json Output Format
    ----------------------
    {}
    ----------------------

    Recipe Info:
    ------------
    {}
    ------------

    RECIPE JSON:
"""

classify_template = """
    You are a culinary expert tasked with identifying the cuisine type of a recipe based on its ingredients, preparation methods, and cultural characteristics.
    Given the recipe below, classify the cuisine as one of the following (if no clear cuisine can be inferred, default to Other):
    
    ID: 1 Name: American
    ID: 2 Name: Italian
    ID: 3 Name: Asian 
    ID: 4 Name: Spanish 
    ID: 5 Name: Other

   Json Output Format
    ----------------------
    {}
    ----------------------

    Recipe Info:
    ------------
    {}
    ------------

    CUISINE:
"""
