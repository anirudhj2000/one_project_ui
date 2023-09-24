import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'

export const PostPrompt = (search) => {

    return axios.post(baseUrl + 'flows/prompt', {
        string: search
    })
}

export const GetPromptResult = (id) => {

    return axios.get(baseUrl + `flows/prompt?prompt_id=${id}`,)
}