import { useAuth0Token } from "./useAuth0Token"
import { getProfile as getBackendProfile } from "../API/users"

export const useProfile = () => {
    const [getToken] = useAuth0Token()

    const getProfile = async () => {
        const token = await getToken()
        const response = await getBackendProfile(token)
        return response.data
    }

    return [getProfile]
}