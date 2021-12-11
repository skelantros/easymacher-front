
export const credsMiddleware = (request) => {
    request.config = {...request.config, withCredentials: true }
    return request
}