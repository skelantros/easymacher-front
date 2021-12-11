import { useState } from "react"

const WordCard = ({word}) => {

    function printAny(word) {
        return(
            <p>{word.id}. <b>{word.word}</b> ({word.translate})</p>
        )
    }

    function getPlural(noun) {
        if(typeof(noun.plural) !== 'undefined') return noun.plural
        else return "-"
    }
    function getGender(noun) {
        return noun.gender
    }

    function printNoun(noun) {
        const plural = getPlural(noun)
        const gender = getGender(noun)
        return(
            <p>{word.id}. <b>{word.word}</b>/{plural} {gender} ({word.translate})</p>
        )
    }

    function printWord(word) {
        if(word.type === "noun") return printNoun(word)
        else if(word.type === "unknown") return printAny(word)
        else return (
            <p>{word.id}. <b>{word.word}</b>. We don't know what type of this word is!</p>
        )
    }

    return (
        <div>
            { printWord(word) }
        </div>
    )
}

export default WordCard;