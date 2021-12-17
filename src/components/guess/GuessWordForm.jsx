import { useState } from "react"
import EMButton from "../UI/button/EMButton"

const GuessWordForm = ({guessNote, attemptCallback, continueCallback}) => {
    const [guess, setGuess] = useState(' ' * guessNote.hint.length)
    const [isAnswered, setIsAnswered] = useState(false)

    function confirmGuess(e) {
        e.preventDefault()
        setIsAnswered(true)
        attemptCallback(guess, guessNote)
    }

    function confirmSkip(e) {
        e.preventDefault()
        setIsAnswered(true)
        attemptCallback('', guessNote)
    }

    function confirmContinue(e) {
        e.preventDefault()
        continueCallback()
    }

    return(
        <form>
            <p><b>{guessNote.hint}</b> ({guessNote.translate})</p>
            <b>Ваш ответ:</b>
            <input 
                value={guess}
                onChange={e => setGuess(e.target.value)}
            />
            <p/>
            <EMButton onClick={confirmGuess} disabled={isAnswered}>Ответить</EMButton>
            <EMButton onClick={confirmSkip} disabled={isAnswered}>Пропустить</EMButton>
            <EMButton onClick={confirmContinue} disabled={!isAnswered}>Дальше</EMButton>
        </form>
    )
}

export default GuessWordForm;