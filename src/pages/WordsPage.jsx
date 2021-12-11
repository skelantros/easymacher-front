import { useEffect, useState } from "react"
import WordsAPI from "../API/WordsAPI"
import AddWord from "../components/words/AddWord"
import WordCard from "../components/words/WordCard"
import { useAuth0Token } from "../hooks/useAuth0Token"
import { useFetching } from "../hooks/useFetching"
import { getWords } from "../API/words"
import { useAuth0 } from "@auth0/auth0-react"

const WordsPage = () => {
    const [words, setWords] = useState([])
    const [error, setError] = useState('')

    const [getToken] = useAuth0Token()

    const [fetchWords, isWordsLoading, wordsError] = useFetching(async () => {
        const token = await getToken()
        const response = await getWords(token)
        setWords(response.data)
    })

    useEffect(() => {
        fetchWords()
    }, [])

    return(
        <div>
            <h1>Список слов:</h1>
            { isWordsLoading ?
                <p>Загрузка...</p>
                : words.map(w => <WordCard word = {w}/>)
            }
            <AddWord errorCallback={(e) => setError(e)}/>
            <p>{error}</p>
        </div>
    )
}

export default WordsPage;