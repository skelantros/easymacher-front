import { useEffect, useState } from "react"
import { getWordsOfGroup } from "../API/wordGroups"
import { useBoolFetching } from "./useBoolFetching"
import { useTokenRequest } from "./useTokenRequest"
import { useWordGuessShuffler } from "./useWordGuessShuffler"

export const useWordGuess = (groupId, initCallback) => {
    const [words, setWords] = useState([])
    const [quizGenerator] = useWordGuessShuffler(words)
    const [makeRequest] = useTokenRequest()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        makeRequest(t => getWordsOfGroup(t, groupId))
            .then(ws => setWords(ws))
            .then(() => initCallback())
            .then(() => setIsLoading(false))
    }, [])

    function checkGuess(guess, guessNote) {
        return wordByGuessNote(guessNote).word === guess
    }

    function wordByGuessNote(guessNote) {
        console.log(guessNote)
        return words.find(w => w.id === guessNote.id)
    }

    return [isLoading, checkGuess, wordByGuessNote, quizGenerator]
}