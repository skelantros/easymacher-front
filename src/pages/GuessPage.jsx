import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import GuessResult from "../components/guess/GuessResult"
import GuessWordForm from "../components/guess/GuessWordForm"
import { useWordGuess } from "../hooks/useWordGuess"

const GuessPage = () => {
    const params = useParams()
    const [isLoading, isError, checkGuess, wordByGuessNote, quizGenerator] = useWordGuess(params.id, initStates)
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

    function showContent() {
        console.log(guessNotes)
        return(
            <div>
                {formIdx < guessNotes.length 
                    ? <GuessWordForm key={formIdx} guessNote={guessNotes[formIdx]} attemptCallback={tryGuess} continueCallback={nextQuestion} />
                    : <GuessResult score={score} wrongWords={wrongWords} endCallback={endGame} restartCallback={initStates}/>
                }
                {res}
            </div>
        )
    }

    return(
        <div>
            {
                isLoading
                ? <p>Загрузка...</p>
                : showContent()
            }
        </div>
    )
}

export default GuessPage;