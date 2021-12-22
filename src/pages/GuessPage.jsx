import { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import { useNavigate, useParams } from "react-router-dom"
import GuessResult from "../components/guess/GuessResult"
import GuessWordForm from "../components/guess/GuessWordForm"
import { useWordGuess } from "../hooks/useWordGuess"

const GuessPage = () => {
    const params = useParams()
    const [isLoading, checkGuess, wordByGuessNote, quizGenerator] = useWordGuess(params.id, initStates)
    const router = useNavigate()

    const [res, setRes] = useState('')

    const [formIdx, setFormIdx] = useState(0)

    const [score, setScore] = useState(0)
    const [wrongWords, setWrongWords] = useState([])
    const [guessNotes, setGuessNotes] = useState([])

    function nextQuestion() {
        setRes('')
        setFormIdx(formIdx + 1)
    }

    function initStates() {
        setGuessNotes(quizGenerator())
        setScore(0)
        setWrongWords([])
        setFormIdx(0)
        setRes('')
    }

    function tryGuess(guess, guessNote) {
        const guessResult = checkGuess(guess, guessNote)
        if(guessResult) {
            setScore(score + 1)
            setRes("Правильно!")
        } else {
            const guessedWord = wordByGuessNote(guessNote)
            setWrongWords([...wrongWords, guessedWord])
            setRes("Неправильно!")
        }

    }

    function endGame() {
        router("/word-groups")
    }

    function currentComponent() {
        if(formIdx < guessNotes.length)
            return <GuessWordForm key={formIdx} guessNote={guessNotes[formIdx]} attemptCallback={tryGuess} continueCallback={nextQuestion} />
        else
            return <GuessResult key={formIdx + 1} score={score} wrongWords={wrongWords} endCallback={endGame} restartCallback={initStates}/>
    }

    return(
        <Container>
            {
                isLoading
                ? <p>Загрузка...</p>
                : currentComponent()
            }
            <Row>{res}</Row>
        </Container>
    )
}

export default GuessPage;