import { useState } from "react"
import { addWord } from "../../API/words"
import { useAuth0Token } from "../../hooks/useAuth0Token"

const AddWord = ({errorCallback}) => {
    const [word, setWord] = useState('')

    const [getToken] = useAuth0Token()

    async function sendWord(word) {
        const token = await getToken()
        await addWord(token, word)
    }

    return(
        <div>
            <b>Добавить слово:</b>
            <input 
                placeholder="Слово"
                onChange={(e) => {setWord(e.target.value)}}
            />
            <button onClick={() => { sendWord(word) }}>Добавить</button>
        </div>
    )
}

export default AddWord;