export const useWordGuessShuffler = (words) => {
    function shuffleArray(array) {
        return array.sort((a, b) => 0.5 - Math.random())
    }
    
    function makeHint(word) {
        const wordLength = word.word.length
        const hintLetters = parseInt(wordLength / 3)
        
        const lettersToHint = shuffleArray([...Array(wordLength).keys()]).slice(0, hintLetters)

        let result = ""
        for(let i = 0; i < wordLength; ++i) {
            if(lettersToHint.includes(i))
                result += word.word.charAt(i)
            else
                result += '-'
        }
        return result 
    }

    function generateGuessNote(word) {
        const hint = makeHint(word)
        return {id: word.id, hint: hint, translate: word.translate}
    }

    const generateQuiz = () => shuffleArray([...words]).map(generateGuessNote)

    return [generateQuiz]
}