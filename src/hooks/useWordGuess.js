import { useEffect, useState } from "react"
import { getWordsOfGroup } from "../API/wordGroups"
import { useBoolFetching } from "./useBoolFetching"
import { useTokenRequest } from "./useTokenRequest"
import { useWordGuessShuffler } from "./useWordGuessShuffler"

export const useWordGuess = (groupId, initCallback) => {
    const [words, setWords] = useState([])
    const [quizGenerator] = useWordGuessShuffler(words)
    const [makeRequest] = useTokenRequest()

    const [fetch, isLoading, isError] = useBoolFetching(async () => {
        const wordsData = await makeRequest(t => getWordsOfGroup(t, groupId))
        setWords(wordsData)
        initCallback()
    })

    useEffect(() => {
        fetch()
    }, [])

    function checkGuess(guess, guessNote) {
        return wordByGuessNote(guessNote).word === guess
    }

    function wordByGuessNote(guessNote) {
        console.log(guessNote)
        return words.find(w => w.id === guessNote.id)
    }

    return [isLoading, isError, checkGuess, wordByGuessNote, quizGenerator]
}