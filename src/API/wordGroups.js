import { bearerConfig, getRequest, postRequest } from "./instance"

const getWordGroups = (token) => {
    return getRequest("/word-groups", bearerConfig(token))
}

const getWordGroupsByOwner = (token, ownerId) => {
    return getRequest("/word-groups", {
        params: {
            user: ownerId
        },
        ...bearerConfig(token)
    })
}

const getWordGroup = (token, id) => {
    return getRequest(`/word-groups/${id}`, bearerConfig(token))
}

const createWordGroup = (token, name, isShared) => {
    return postRequest("/word-groups/create", {
        name,
        isShared
    }, bearerConfig(token))
}

const addWordsToGroup = (token, groupId, wordsIds) => {
    return postRequest(`/word-groups/${groupId}/add-words`, {
        words: wordsIds
    }, bearerConfig(token))
}

const updateGroup = (token, id, name = null, isShared = null) => {
    return postRequest(`/word-groups/${id}/update`, {
        isShared,
        name
    }, bearerConfig(token))
}

const removeGroup = (token, id) => {
    return postRequest(`/word-groups/${id}/remove`, {}, bearerConfig(token))
}