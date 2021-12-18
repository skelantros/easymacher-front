import { useState } from "react"
import EMButton from "../UI/button/EMButton"

const WordCard = ({word}) => {

    function printAny(word) {
        return(
            <span>{word.id}. <b>{word.word}</b> ({word.translate})</span>
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
            <span>{word.id}. <b>{word.word}</b>/{plural} {gender} ({word.translate})</span>
        )
    }

    function printWord(word) {
        if(word.type === "noun") return printNoun(word)
        else if(word.type === "unknown") return printAny(word)
        else return (
            <span>{word.id}. <b>{word.word}</b>. We don't know what type of this word is!</span>
        )
    }

    return (
        printWord(word)
    )
}

export default WordCard;