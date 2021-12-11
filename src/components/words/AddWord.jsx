import { useState } from "react"
import WordsAPI from "../../API/WordsAPI"
import { useAuth0 } from "@auth0/auth0-react"

const AddWord = ({errorCallback}) => {
    const [word, setWord] = useState('')

    const { user, isAuthenicated, getAccessTokenSilently } = useAuth0()


    const addWord = async (word) => {
        
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