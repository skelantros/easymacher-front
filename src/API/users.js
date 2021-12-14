import { bearerConfig, getRequest } from "./instance"

export const getProfile = (token) => {
    return getRequest("/profile", bearerConfig(token))
}