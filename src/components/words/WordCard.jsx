import { useState } from "react"
import Card from "react-bootstrap/Card"
import EMButton from "../UI/button/EMButton"

const WordCard = ({word, content}) => {

    function printAny(word) {
        return(
            <Card style={{ width: '18rem' }}>
                <Card.Title>{word.word}</Card.Title>
                <Card.Text>{word.translate}</Card.Text>
                {content}
            </Card>
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
            <Card style={{ width: '18rem' }}>
                <Card.Title>{word.word} ({plural}) {gender}</Card.Title>
                <Card.Text>
                    {word.translate}
                </Card.Text>
                {content}
            </Card>
        )
    }

    function printWord(word) {
        if(word.type === "noun") return printNoun(word)
        else return printAny(word)
    }

    return (
        printWord(word)
    )
}

export default WordCard;