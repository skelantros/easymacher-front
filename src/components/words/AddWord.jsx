import { useState } from "react"
import Form from "react-bootstrap/Form"
import { addWord } from "../../API/words"
import { useAuth0Token } from "../../hooks/useAuth0Token"
import EMButton from "../UI/button/EMButton"

const AddWord = ({errorCallback, addWordCallback}) => {
    const [word, setWord] = useState('')
    const [translate, setTranslate] = useState(null)
    const [type, setType] = useState('unknown')
    const [plural, setPlural] = useState(null)

    const [getToken] = useAuth0Token()

    function isNoun() {
        return type === 'noun' || word.startsWith('der ') || word.startsWith('die ') || word.startsWith('das ')
    }

    async function sendWord(e) {
        e.preventDefault()
        const token = await getToken()
        const {data: newWord} = await addWord(token, word, translate, type, plural)
        await addWordCallback(newWord)
        setWord('')
        setTranslate(null)
        setType('unknown')
        setPlural(null)
    }

    const nounParameters = (
        <div>
            <b>Множественное число: </b>
            <input 
                placeholder="Мн. число"
                onChange={(e) => {setPlural(e.target.value)}}
            />
        </div>
    )

    return(
        <form>
            <b>Слово: </b>
            <input 
                placeholder="Слово"
                onChange={(e) => {setWord(e.target.value)}}
            />
            <p/>
            <b>Перевод: </b>
            <input 
                placeholder="Перевод"
                onChange={(e) => {setTranslate(e.target.value)}}
            />
            <p/>
            <b>Часть речи: </b>
            <select 
                value= {type}
                onChange= {e => setType(e.target.value) }
            >
                
                <option value="unknown">{"-"}</option>
                <option value="noun">{"существительное"}</option>
            </select>
            <p/>
            { isNoun() ? nounParameters : <div /> }
            <EMButton onClick={sendWord}>Добавить</EMButton>
        </form>
    )
}

export default AddWord;