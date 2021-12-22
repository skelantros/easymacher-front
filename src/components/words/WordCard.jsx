import { useState } from "react"
import Card from "react-bootstrap/Card"
import EMButton from "../UI/button/EMButton"

const WordCard = ({word, content}) => {
    function getPlural(noun) {
        if(typeof(noun.plural) !== 'undefined') return noun.plural
        else return "-"
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
            return <i>без перевода</i>
        else
            return word.translate
    }

    function anyTitle(word) {
        return <Card.Title>{word.word}</Card.Title>
    }

    function nounTitle(noun) {
        return <Card.Title>{nounArticle(word)} {word.word} ({getPlural(noun)})</Card.Title>
    }

    function title(word) {
        if(word.type === "noun") return nounTitle(word)
        else return anyTitle(word)
    }

    return (
        <Card className="shadow p-3 mx-2 mb-2 bg-white rounded" border="light" style={{ width: '18rem' }}>
            {title(word)}
            <Card.Text>
                {translate(word)}
            </Card.Text>
            {content}
        </Card>
    )
}

export default WordCard;