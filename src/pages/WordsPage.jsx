import { useEffect, useState } from "react"
import AddWord from "../components/words/AddWord"
import WordCard from "../components/words/WordCard"
import { useAuth0Token } from "../hooks/useAuth0Token"
import { useFetching } from "../hooks/useFetching"
import { addWord, getWords, removeWord } from "../API/words"
import EMButton from "../components/UI/button/EMButton"
import PopupWindow from "../components/UI/popup/PopupWindow"
import EMDiv from "../components/UI/div/EMDiv"
import { Button, Col, Container, FormControl, InputGroup, Row } from "react-bootstrap"
import { useNameFilter } from "../hooks/useNameFilter"

const WordsPage = () => {
    const [words, setWords] = useState([])
    const [error, setError] = useState('')  

    const [filter, setFilter] = useState('')
    const [filteredWords] = useNameFilter(words, w => w.word, filter)

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
            <Row>
                <Col>
                    <InputGroup>
                        <InputGroup.Text>Поиск слов:</InputGroup.Text>
                        <FormControl onChange={e => setFilter(e.target.value)} value={filter}/>
                    </InputGroup>
                </Col>
                <Col>
                    <Button variant="primary" onClick={beginPopup}>Добавить слово</Button>
                </Col>
            </Row>
            <Row>
            { isWordsLoading ?
                <p>Загрузка...</p>
                : filteredWords.map(w => 
                    <WordCard key={w.id} word={w} content={<Button variant="danger" onClick = {() => removeWordFromList(w.id) }>Удалить</Button>} />
                )
            }
            <PopupWindow visible={popup} setVisible={setPopup}>
                <AddWord errorCallback={(e) => setError(e)} addWordCallback={endPopup}/>
            </PopupWindow>
            <p>{error}</p>
            </Row>
        </Container>
    )
}

export default WordsPage;