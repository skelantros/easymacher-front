import { useState } from "react"
import WordsAPI from "../../API/WordsAPI"
import {credsMiddleware} from "../../API/middlewares/credsMiddleware"

const AddWord = ({errorCallback}) => {
    const [word, setWord] = useState('')

    const addWord = async (word) => {
        const request = credsMiddleware(WordsAPI.addWord(word))
        const resp = await request
        errorCallback(resp.data)
    }

    return(
        <div>
            <b>Добавить слово:</b>
            <input 
                placeholder="Слово"
                onChange={(e) => {setWord(e.target.value)}}
            />
            <button onClick={() => { addWord(word) }}>Добавить</button>
        </div>
    )
}

export default AddWord;