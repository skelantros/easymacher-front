import { useAuth0Token } from "./useAuth0Token"
import { getWords as getWordsFromDb } from "../API/words"

export const useWords = () => {
    const [getToken] = useAuth0Token()

    const getWords = async () => {
        const token = await getToken()
        const response = await getWordsFromDb(token)
        return response.data   
    }

    return [getWords]
}