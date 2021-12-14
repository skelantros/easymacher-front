import React, { useState } from "react"
import { useAuth0Token } from "../../hooks/useAuth0Token";
import { useProfile } from "../../hooks/useProfile";
import WordGroupsPage from "../../pages/WordGroupsPage";
import EMButton from "../UI/button/EMButton";

const WordGroupCard = ({group, profile, wordsListCallback, editCallback}) => {
    // group: id, owner, name

    return(
        <div>
            <b>{group.name}</b>
            <EMButton onClick={() => wordsListCallback(group)}>Список слов</EMButton>
            { group.owner === profile.id || profile.role === 'admin' 
                ? <EMButton onClick = {() => editCallback(group)}>Редактировать</EMButton>
                : <div />
            }
        </div>
    )
}

export default WordGroupCard;