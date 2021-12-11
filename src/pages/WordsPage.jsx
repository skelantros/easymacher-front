import { useEffect, useState } from "react"
import AddWord from "../components/words/AddWord"
import WordCard from "../components/words/WordCard"
import { useAuth0Token } from "../hooks/useAuth0Token"
import { useFetching } from "../hooks/useFetching"
import { getWords } from "../API/words"

const WordsPage = () => {
    const [words, setWords] = useState([])
    const [error, setError] = useState('')

    const [getToken] = useAuth0Token()

    const [fetchWords, isWordsLoading, wordsError] = useFetching(async () => {
        const token = await getToken()
        const response = await getWords(token)
        setWords(response.data)
    })

    function updateCallback() {}

    useEffect(() => {
        fetchWords()
    }, [])

    return(
        <div>
            <h1>Список слов:</h1>
            { isWordsLoading ?
                <p>Загрузка...</p>
                : words.map(w => <WordCard key = {w.id} word = {w}/>)
            }
            <AddWord errorCallback={(e) => setError(e)}/>
            <p>{error}</p>
        </div>
    )
}

export default WordsPage;