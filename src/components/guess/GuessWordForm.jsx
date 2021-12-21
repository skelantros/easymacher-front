import { useState } from "react"
import EMButton from "../UI/button/EMButton"

const GuessWordForm = ({guessNote, attemptCallback, continueCallback}) => {
    const [guess, setGuess] = useState(guessNote.hint.replace(/-/g, " "))
    const [isAnswered, setIsAnswered] = useState(false)

    function changeSymb(i, newSymb) {
        setGuess(guess.substr(0, i) + newSymb + guess.substr(i + 1))
    }

    function makeInput(i) {
        return <input 
            key={i}
            maxLength={1}
            placeholder={guess[i]}
            size={1}
            onChange={e => {
                const symb = e.target.value
                changeSymb(i, symb === "" ? " " : symb)
            }}
        />
    }

    function inputsIdxsArray() {
        return Array.from(Array(guess.length).keys())
    }

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
            {inputsIdxsArray().map(i => makeInput(i))}
            <p/>
            <EMButton onClick={confirmGuess} disabled={isAnswered}>Ответить</EMButton>
            <EMButton onClick={confirmSkip} disabled={isAnswered}>Пропустить</EMButton>
            <EMButton onClick={confirmContinue} disabled={!isAnswered}>Дальше</EMButton>
        </form>
    )
}

export default GuessWordForm;