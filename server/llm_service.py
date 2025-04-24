from langchain_core.messages import HumanMessage
from langchain_core.output_parsers import JsonOutputParser
from langchain.chains.summarize import load_summarize_chain
from langchain_text_splitters import CharacterTextSplitter
from langchain_ibm import ChatWatsonx
import os


class LLMService:
    def __init__(self, model="ibm/granite-3-2-8b-instruct"):
        self.model = model
        self.llm = ChatWatsonx(
            model_id=self.model,
            url="https://us-south.ml.cloud.ibm.com",
            project_id=os.getenv("WATSONX_PROJECT_ID"),
            apikey=os.getenv("WATSONX_APIKEY"),
        )

    def inference(self, human_prompt):
        messages = [HumanMessage(human_prompt)]
        return self.llm.invoke(messages).content

    def summarization(self, text, type, config):
        splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=250)
        docs_summary = splitter.create_documents([text])
        summarize_chain = load_summarize_chain(self.llm, type, verbose=True)
        return summarize_chain.invoke(docs_summary, config)["output_text"]

    def get_format_instructions(self, pydantic_object):
        parser = JsonOutputParser(pydantic_object=pydantic_object)
        return parser.get_format_instructions()
