import { useEffect, useState } from "react"
import AddWord from "../components/words/AddWord"
import WordCard from "../components/words/WordCard"
import { useAuth0Token } from "../hooks/useAuth0Token"
import { useFetching } from "../hooks/useFetching"
import { addWord, getWords, removeWord } from "../API/words"
import EMButton from "../components/UI/button/EMButton"
import PopupWindow from "../components/UI/popup/PopupWindow"
import EMDiv from "../components/UI/div/EMDiv"
import { Button, Container } from "react-bootstrap"

const WordsPage = () => {
    const [words, setWords] = useState([])
    const [error, setError] = useState('')

    const [popup, setPopup] = useState(false)

    function beginPopup() {
        setPopup(true)
    }

    async function endPopup(word) {
        await addWordToList(word)
        setPopup(false)
    }

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
        <Container>
            <Button variant="primary" onClick={beginPopup}>Добавить слово</Button>
            <h1>Список слов:</h1>
            { isWordsLoading ?
                <p>Загрузка...</p>
                : words.map(w => 
                    <WordCard key={w.id} word={w} content={<Button variant="danger" onClick = {() => removeWordFromList(w.id) }>Удалить</Button>} />
                )
            }
            <PopupWindow visible={popup} setVisible={setPopup}>
                <AddWord errorCallback={(e) => setError(e)} addWordCallback={endPopup}/>
            </PopupWindow>
            <p>{error}</p>
        </Container>
    )
}

export default WordsPage;