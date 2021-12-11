import { useState } from "react"

const WordCard = ({word}) => {
    return (
        <div>
            <h2>{word.id}. {word.word}</h2>
        </div>
    )
}

export default WordCard;