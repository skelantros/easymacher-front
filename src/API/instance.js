import axios from "axios";
import { api } from "./constants";

export const instance = axios.create({
    baseURL: api,
    withCredentials: true
})

export const request = (url, config) => {
    return instance.request({
        url,
        ...config
    })
}

export const getRequest = (url, config) => {
    return request(url, {
        method: 'get',
        ...config
    })
}

export const postRequest = (url, data, config) => {
    return request(url, {
        method: 'post',
        data,
        ...config
    })
}

export const bearerConfig = (token) => {
    return {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
}