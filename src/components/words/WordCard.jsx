import { useState } from "react"
import Card from "react-bootstrap/Card"
import EMButton from "../UI/button/EMButton"

const WordCard = ({word, content}) => {
    function getPlural(noun) {
        if(typeof(noun.plural) !== 'undefined') return noun.plural
        else return "-"
    }
    function getGender(noun) {
        return noun.gender
    }

    function nounArticle(noun) {
        if(noun.gender === 'm')
            return 'der'
        else if(noun.gender === 'f')
            return 'die'
        else if(noun.gender === 'n')
            return 'das'
        else
            return 'unknown'
    }

    function translate(word) {
        console.log(word.translate)
        if(word.translate === undefined || word.translate === null || word.translate === '')
            return ' '
        else
            return word.translate
    }

    function printAny(word) {
        return(
            <Card style={{ width: '18rem' }}>
                <Card.Title>{word.word}</Card.Title>
                <Card.Text>{translate(word)}</Card.Text>
                {content}
            </Card>
        )
    }

    function printNoun(noun) {
        const plural = getPlural(noun)

        return(
            <Card style={{ width: '18rem' }}>
                <Card.Title>{nounArticle(word)} {word.word} ({plural})</Card.Title>
                <Card.Text>
                    {translate(word)}
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