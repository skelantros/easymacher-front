import { useState } from "react"
import { addWord } from "../../API/words"
import { useAuth0Token } from "../../hooks/useAuth0Token"

const AddWord = ({errorCallback, addWordCallback}) => {
    const [word, setWord] = useState(null)
    const [translate, setTranslate] = useState(null)
    const [type, setType] = useState('unknown')
    const [plural, setPlural] = useState(null)

    const [getToken] = useAuth0Token()

    async function sendWord(word) {
        const token = await getToken()
        const {data: newWord} = await addWord(token, word, translate, type, plural)
        addWordCallback(newWord)
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
        <div>
            <h3>Добавить слово:</h3>
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
            { type === 'noun' ? nounParameters : <div /> }
            <button onClick={() => { sendWord(word) }}>Добавить</button>
        </div>
    )
}

export default AddWord;