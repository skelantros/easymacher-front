import { useEffect, useState } from "react"
import AddWord from "../components/words/AddWord"
import WordCard from "../components/words/WordCard"
import { useAuth0Token } from "../hooks/useAuth0Token"
import { useFetching } from "../hooks/useFetching"
import { addWord, getWords, removeWord } from "../API/words"
import EMButton from "../components/UI/button/EMButton"

const WordsPage = () => {
    const [words, setWords] = useState([])
    const [error, setError] = useState('')

    const [getToken] = useAuth0Token()

    const [fetchWords, isWordsLoading, wordsError] = useFetching(async () => {
        const token = await getToken()
        const response = await getWords(token)
        setWords(response.data)
    })

    const addWordToList = (word) => {
        setWords([...words, word])
    }

    const removeWordFromList = async (id) => {
        const token = await getToken()
        const response = await removeWord(token, id)
        console.log(response)

        const newList = words.filter(w => w.id !== id)
        setWords(newList)
    }

    useEffect(() => {
        fetchWords()
    }, [])

    return(
        <div>
            <h1>Список слов:</h1>
            { isWordsLoading ?
                <p>Загрузка...</p>
                : words.map(w => 
                    <div key = {w.id} >
                        <WordCard word = {w} />
                        <EMButton onClick = {() => removeWordFromList(w.id) }>Удалить</EMButton>
                    </div>
                )
            }
            <AddWord errorCallback={(e) => setError(e)} addWordCallback={addWordToList}/>
            <p>{error}</p>
        </div>
    )
}

export default WordsPage;