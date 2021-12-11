import { useEffect, useState } from "react"
import WordsAPI from "../API/WordsAPI"
import AddWord from "../components/words/AddWord"
import WordCard from "../components/words/WordCard"
import { credsMiddleware } from "../API/middlewares/credsMiddleware"
import { useFetching } from "../hooks/useFetching"

const WordsPage = () => {
    const [words, setWords] = useState([])
    const [error, setError] = useState('')

    const [fetchWords, isWordsLoading, wordsError] = useFetching(async () => {
        const response = await credsMiddleware(WordsAPI.allWords())
        console.log(response)
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