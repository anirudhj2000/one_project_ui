import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'

export const GetPromptResult = (search) => {

    return axios.post(baseUrl + 'flows/prompt', {
        string: search
    })
}