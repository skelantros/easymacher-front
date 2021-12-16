import { useAuth0Token } from "./useAuth0Token"

export const useTokenRequest = () => {
    const [getToken] = useAuth0Token()

    const makeRequest = async (requestFunc) => {
        const token = await getToken()
        const response = await requestFunc(token)
        return response.data
    }

    return [makeRequest]
}