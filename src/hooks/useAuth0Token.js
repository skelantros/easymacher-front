import { useAuth0 } from "@auth0/auth0-react"
import { api } from "../API/constants"

export const useAuth0Token = (apiHost = api) => {
    const { user, isAuthenicated, getAccessTokenSilently } = useAuth0()

    const getToken = async () => {
        return await getAccessTokenSilently({
            audience: apiHost,
            scope: "read:current_user",
        })
    }

    return [getToken]
}