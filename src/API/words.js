import { getRequest } from "./instance"

export const getWords = (token) => {
    return getRequest("/words", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}