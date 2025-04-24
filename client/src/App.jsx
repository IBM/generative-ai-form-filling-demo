import {
    Button,
    Column,
    ComboBox,
    DatePicker,
    DatePickerInput,
    FileUploader,
    FormLabel,
    Grid,
    Header,
    HeaderName,
    TextArea,
    TextInput,
    InlineLoading,
} from '@carbon/react'
import { AiGenerate } from '@carbon/icons-react'
import React, { useState } from 'react'
import { getRecipeFileInfo, getRecipeUrlInfo } from './api'

export default function App() {
    const [recipeUploadFile, setRecipeUploadFile] = useState()
    const [recipeUploadUrl, setRecipeUploadUrl] = useState('')
    const [recipeForm, setRecipeUploadForm] = useState({})
    const [loading, setLoading] = useState('')

    const handleGenerate = async (e) => {
        e.preventDefault()
        setLoading('active')
        let recipeResponse
        if (recipeUploadFile) {
            recipeResponse = await getRecipeFileInfo(recipeUploadFile)
        } else {
            recipeResponse = await getRecipeUrlInfo(recipeUploadUrl)
        }
        recipeResponse.steps = recipeResponse.steps
            .map((value, index) => `${index+1}: ${value}`)
            .join('\n\n')
        recipeResponse.ingredients = recipeResponse.ingredients
            .map((value) => `• ${value}`)
            .join('\n')
        setRecipeUploadForm(recipeResponse)
        setLoading('inactive')
    }

    return (
        <div>
            <Header>
                <HeaderName href="#" prefix="Recipes" />
            </Header>
            <Grid className="cds--content">
                <Column lg={16}>
                    <FormLabel>Step 1: Provide recipe content</FormLabel>
                </Column>
                <Column lg={4}>
                    <FileUploader
                        filenameStatus="edit"
                        multiple={false}
                        onDelete={() => setRecipeUploadFile()}
                        labelTitle="Upload Files"
                        buttonLabel="Add File"
                        disabled={recipeUploadUrl.trim().length > 0}
                        onChange={(e) => setRecipeUploadFile(e.target.files[0])}
                    />
                </Column>
                <Column lg={1}>
                    <span>or</span>
                </Column>
                <Column lg={4}>
                    <TextInput
                        id="recipe-url"
                        labelText="Recipe url"
                        placeholder="Enter a recipe url"
                        size="md"
                        type="text"
                        disabled={!!recipeUploadFile}
                        onChange={(e) => setRecipeUploadUrl(e.target.value)}
                    />
                </Column>
                <Column style={{display: 'flex', gap: '1rem'}} lg={16}>
                    <Button
                        kind="tertiary"
                        renderIcon={AiGenerate}
                        onClick={handleGenerate}
                    >
                        Generate
                    </Button>
                    <InlineLoading  status={loading} />
                </Column>
                <Column lg={16}>
                    <FormLabel>Step 2: Provide recipe content</FormLabel>
                </Column>
                <Column lg={16}>
                    <TextInput
                        id="recipe-title"
                        labelText="Title"
                        size="md"
                        type="text"
                        value={recipeForm.title}
                    />
                </Column>
                <Column lg={16}>
                    <TextInput
                        id="recipe-author"
                        labelText="Author"
                        size="md"
                        type="text"
                        value={recipeForm.author}
                    />
                </Column>
                <Column lg={16}>
                    <DatePicker datePickerType="single">
                        <DatePickerInput
                            id="recipe-publication-date"
                            labelText="Publication Date"
                            onChange={() => {}}
                            onClose={() => {}}
                            onOpen={() => {}}
                            placeholder="mm/dd/yyyy"
                            value={recipeForm.publicationDate}
                        />
                    </DatePicker>
                </Column>
                <Column lg={16}>
                    <ComboBox
                        id="carbon-combobox"
                        itemToString={(item) => item.text}
                        items={[
                            {
                                id: '0',
                                text: 'American',
                            },
                            {
                                id: '1',
                                text: 'Italian',
                            },
                            {
                                id: '2',
                                text: 'Asian',
                            },
                            {
                                id: '3',
                                text: 'Spanish',
                            },
                            {
                                id: '4',
                                text: 'Other',
                            },
                        ]}
                        onChange={() => {}}
                        onToggleClick={() => {}}
                        titleText="Cuisine"
                        value={recipeForm?.cuisine?.name}
                    />
                </Column>
                <Column lg={16}>
                    <TextArea
                        id="recipe-overview"
                        labelText="Recipe overview"
                        rows={4}
                        value={recipeForm?.overview}
                    />
                </Column>
                <Column lg={16}>
                    <TextArea
                        id="recipe-ingredients"
                        labelText="Ingredients"
                        rows={4}
                        value={recipeForm?.ingredients}
                    />
                </Column>
                <Column lg={16}>
                    <TextArea
                        id="recipe-steps"
                        labelText="Steps"
                        rows={4}
                        value={recipeForm?.steps}
                    />
                </Column>
                <Column lg={16}>
                    <Button>Save</Button>
                </Column>
            </Grid>
        </div>
    )
}
