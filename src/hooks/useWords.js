import { useAuth0Token } from "./useAuth0Token"
import { getWords as getWordsFromDb, removeWord as removeWordFromDb } from "../API/words"
import { useFetching } from "./useFetching"
import { useEffect, useState } from "react"

export const useWords = () => {
    const [getToken] = useAuth0Token()
    const [words, setWords] = useState([])

    const [fetchWords, isWordsLoading, wordsError] = useFetching(async () => {
        const token = await getToken()
        const response = await getWordsFromDb(token)
        setWords(response.data)
    })

    useEffect(() => {
        fetchWords()
    }, [])

    return [words, isWordsLoading, wordsError]
}