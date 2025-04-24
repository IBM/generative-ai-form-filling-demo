from fastapi import FastAPI, UploadFile
from docling.datamodel.base_models import DocumentStream
from docling.document_converter import DocumentConverter
from llm_service import LLMService
from io import BytesIO
from pydantic import BaseModel
from templates import extract_template, classify_template, Recipe, Cuisine
from json import loads

app = FastAPI()


class Url(BaseModel):
    url: str


def parse(result):
    llm = LLMService()

    markdown_recipe = result.document.export_to_markdown()

    # extract
    extract_format_instructions = llm.get_format_instructions(Recipe)
    recipe_data = loads(
        llm.inference(
            extract_template.format(extract_format_instructions, markdown_recipe)
        )
    )

    # classify
    classify_format_instructions = llm.get_format_instructions(Cuisine)
    recipe_data["cuisine"] = loads(
        llm.inference(
            classify_template.format(classify_format_instructions, markdown_recipe)
        )
    )

    # Max token limit
    llm_config = {"max_token": 250}

    # summarize
    recipe_data["overview"] = llm.summarization(markdown_recipe, "stuff", llm_config)

    return recipe_data


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/recipe/file")
def recipe_file(upload_file: UploadFile):
    """
    Generate recipe fields from file
    """
    bytes_file = BytesIO(upload_file.file.read())
    converter = DocumentConverter()
    recipe = DocumentStream(name=upload_file.filename, stream=bytes_file)
    result = converter.convert(recipe)
    struct_response = parse(result)

    return struct_response


@app.post("/recipe/url")
def recipe_url(body: Url):
    """
    Generate recipe fields from url
    """
    converter = DocumentConverter()
    result = converter.convert(body.url)

    struct_response = parse(result)

    return struct_response
