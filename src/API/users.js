import { bearerConfig, getRequest, postRequest } from "./instance"

export const getProfile = (token) => {
    return getRequest("/profile", bearerConfig(token))
}

export const getUserById = (token, id) => {
    return getRequest("/user", {
        params: {
            id
        },
        ...bearerConfig(token)
    })
}

export const updateProfile = (token, username = null, email = null, firstName = null, lastName = null) => {
    return postRequest("/update-info", {
        email,
        username,
        firstName,
        lastName
    }, bearerConfig(token))
}

export const editUser = (token, id, username = null, email = null, firstName = null, lastName = null) => {
    return postRequest(`/user/${id}/edit`, {
        email,
        username,
        firstName,
        lastName
    }, bearerConfig(token))
}

export const removeUser = (token, id) => {
    return postRequest(`/user/${id}/remove`, {}, bearerConfig(token))
}