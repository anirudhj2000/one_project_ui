import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'

export const PostPrompt = (data) => {

    return axios.post(baseUrl + 'flows/prompt',data)
}

export const GetPromptResult = (id) => {

    return axios.get(baseUrl + `flows/prompt?prompt_id=${id}`,)
}

export const GetSuggestionsResult = (id) => {
    return axios.get(baseUrl + `flows/suggestion?response_id=${id}`,)
}