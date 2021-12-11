import { bearerConfig, getRequest, postRequest, request } from "./instance"

export const getWords = (token) => {
    return getRequest("/words", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const addWord = (token, word) => {
    return postRequest("/add-word", {
        "word": word
    }, bearerConfig(token))
}