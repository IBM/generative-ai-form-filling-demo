# GenAI Form Auto-fill Demo

This is a demo application that demonstrates generative AI form auto-filling for the following [article](https://developer.ibm.com/tutorials/generative-ai-form-filling-tool/).

## Running the frontend application

1. Change directory to client. `cd client`
2. install [node v22.14.0](https://nodejs.org/en/download/prebuilt-installer)
3. run `npm ci`
4. run `npm run dev`
5. visit http://localhost:5173/ to test the web interface

## Running the backend application

1. Change directory to server `cd server`
2. In a separate terminal install [pyenv](https://github.com/pyenv/pyenv-installer?tab=readme-ov-file#pyenv-installer)
3. Install python 3.12 with pyenv `pyenv install 3.12`
4. Create a virtual environment with the newly install python version. `pyenv virtualenv 3.12 form-ai-test`
5. Activate the python virtual environment. `pyenv activate form-ai-test`
6. Install packages. `pip install -r requirements.txt`
7. Run server `fastapi run main.py`

## Instructions

1. Upload a file or enter a url or a food recipe
2. Hit Generate

# IBM Public Repository Disclosure
All content in these repositories including code has been provided by IBM under the associated open source software license and IBM is under no obligation to provide enhancements, updates, or support. IBM developers produced this code as an open source project (not as an IBM product), and IBM makes no assertions as to the level of quality nor security, and will not be maintaining this code going forward.
