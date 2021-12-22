import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { wordGroupLink } from "../../logic/links";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

const WordGroupCard = ({group}) => {
    const router = useNavigate()

    return(
        <Card className="shadow p-3 mx-2 mb-2 bg-white rounded" border="light" style={{ width: '18rem' }}>
            <Card.Title>{group.name}</Card.Title>
            <Button onClick={() => router(wordGroupLink(group.id))}>Подробнее</Button>
        </Card>
    )
}

export default WordGroupCard;