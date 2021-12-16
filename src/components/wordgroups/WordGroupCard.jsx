import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { wordGroupLink } from "../../logic/links";
import EMButton from "../UI/button/EMButton";

const WordGroupCard = ({group}) => {
    const router = useNavigate()

    return(
        <div>
            <b>{group.name}</b>
            <EMButton onClick={() => router(wordGroupLink(group.id))}>Подробнее</EMButton>
        </div>
    )
}

export default WordGroupCard;