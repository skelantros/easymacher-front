import { useEffect, useState } from "react"
import { getWordsOfGroup } from "../../API/wordGroups"
import { removeWord } from "../../API/words"
import { useAuth0Token } from "../../hooks/useAuth0Token"
import { useFetching } from "../../hooks/useFetching"
import EMButton from "../UI/button/EMButton"
import WordCard from "../words/WordCard"

const WordsListForm = ({profile, group, closeCallback}) => {
    const [words, setWords] = useState([])
    const [id, setId] = useState(1)
    const [name, setName] = useState('')
    const [getToken] = useAuth0Token()

    const [fetchWords, isWordsLoading, wordsError] = useFetching(async () => {
        const token = await getToken()
        const response = await getWordsOfGroup(token, id)
        setWords(response.data)
    })

    useEffect(() => {
        setId(group.id)
        setName(group.name)
        fetchWords()
    }, [group])

    function canEdit() {
        return profile.id === group.ownerId || profile.role === 'admin'
    }

    async function removeWordFromList(id) {
        const token = await getToken()
        const response = await removeWord(token, id)
        setWords(words.filter(w => w.id !== id))
    }

    async function close(e) {
        e.preventDefault()
        await closeCallback()
    }

    return(
        <form>
            <h2>{name}</h2>
            { isWordsLoading 
                ? <p>Загрузка...</p>
                : words.map(w => 
                    <div key = {w.id} >
                        <WordCard word = {w} />
                        { canEdit() ? <EMButton onClick = {() => removeWordFromList(w.id) }>Удалить</EMButton> : <div /> }
                    </div>
                )
            }
            <EMButton onClick = {close} >Закрыть</EMButton>
        </form>
    )
}

export default WordsListForm;