import { bearerConfig, getRequest, postRequest, request } from "./instance"

export const getWords = (token) => {
    return getRequest("/words", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const addWord = (token, word, translate, type, plural) => {
    return postRequest("/add-word", {
        "word": word,
        "translate": translate,
        "type": type,
        "plural": plural
    }, bearerConfig(token))
}

export const removeWord = (token, id) => {
    return postRequest(`/word/${id}/remove`, {}, bearerConfig(token))
}