
import axios from 'axios'

export const getRecipeUrlInfo = (url) => {
    return axios
        .post('/recipe/url', {
            url,
        })
        .then((resp) => resp.data)
        .catch((error) => {
            console.error('ERROR: ', error)
        })
}

export const getRecipeFileInfo = (recipeFile) => {
    const formData = new FormData()
    formData.append('upload_file', recipeFile)
    const headers = {
        'Content-Type': 'multipart/form-data',
    }
    return axios
        .post('/recipe/file', formData, { headers })
        .then((resp) => {
            return resp.data
        })
        .catch((error) => {
            console.error('ERROR: ', error)
        })
}
