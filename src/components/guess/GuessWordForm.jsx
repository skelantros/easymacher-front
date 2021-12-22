import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

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
        <Form>
            <p><b>{guessNote.hint}</b> ({guessNote.translate})</p>
            <b>Ваш ответ:</b>
            {inputsIdxsArray().map(i => makeInput(i))}
            <p/>
            <Button className="mt-1" onClick={confirmGuess} disabled={isAnswered}>Ответить</Button>
            <Button variant="light" className="mx-2 mt-1" onClick={confirmSkip} disabled={isAnswered}>Пропустить</Button>
            <Button variant="secondary" className="mt-1" onClick={confirmContinue} disabled={!isAnswered}>Дальше</Button>
        </Form>
    )
}

export default GuessWordForm;