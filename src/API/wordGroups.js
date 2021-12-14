import { bearerConfig, getRequest, postRequest } from "./instance"

export const getWordGroups = (token) => {
    return getRequest("/word-groups", bearerConfig(token))
}

export const getWordGroupsByOwner = (token, ownerId) => {
    return getRequest("/word-groups", {
        params: {
            user: ownerId
        },
        ...bearerConfig(token)
    })
}

export const getWordGroup = (token, id) => {
    return getRequest(`/word-groups/${id}`, bearerConfig(token))
}

export const createWordGroup = (token, name, isShared) => {
    return postRequest("/word-groups/create", {
        name,
        isShared
    }, bearerConfig(token))
}

export const addWordsToGroup = (token, groupId, wordsIds) => {
    return postRequest(`/word-groups/${groupId}/add-words`, {
        words: wordsIds
    }, bearerConfig(token))
}

export const updateGroup = (token, id, name = null, isShared = null) => {
    return postRequest(`/word-groups/${id}/update`, {
        isShared,
        name
    }, bearerConfig(token))
}

export const removeGroup = (token, id) => {
    return postRequest(`/word-groups/${id}/remove`, {}, bearerConfig(token))
}