import axios from 'axios'

const baseUrl = 'http://143.110.244.194:8000/'

export const PostPrompt = (data) => {

    return axios.post(baseUrl + 'flows/prompt',data)
}

export const GetPromptResult = (id) => {

    return axios.get(baseUrl + `flows/prompt?prompt_id=${id}`,)
}