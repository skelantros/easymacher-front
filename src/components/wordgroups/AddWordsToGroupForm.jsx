import { useEffect, useState } from "react";
import { useAuth0Token } from "../../hooks/useAuth0Token";
import { useWords } from "../../hooks/useWords";
import EMButton from "../UI/button/EMButton";
import WordCard from "../words/WordCard";

const AddWordsToGroupForm = ({group, closeCallback, addWordCallback}) => {
    const [words, isWordsLoading, wordsError, addWord, removeWord] = useWords()
    const [id, setId] = useState(1)

    useEffect(() => {
        setId(group.id)
    }, [group])

    function addWordButton(e, word) {
        e.preventDefault()
        removeWord(word.id)
        addWordCallback(group, word)
    }

    function closeButton(e) {
        e.preventDefault()
        closeCallback()
    }

    function showWord(word) {
        return(
            <div key = {word.id}>
                <WordCard word={word} />
                <EMButton onClick = {e => addWordButton(e, word) }>+</EMButton>
            </div>
        )
    }

    return(
        <form>
            <h2>Список слов:</h2>
            {
                isWordsLoading
                ? <p>Загрузка...</p>
                : words.map(w => {
                    return showWord(w)
                })
            }
            <EMButton onClick = {closeButton} >Закрыть</EMButton>
        </form>
    )
}

export default AddWordsToGroupForm;