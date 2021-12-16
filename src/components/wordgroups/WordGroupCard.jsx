import React, { useState } from "react"
import { useAuth0Token } from "../../hooks/useAuth0Token";
import { useProfile } from "../../hooks/useProfile";
import WordGroupsPage from "../../pages/WordGroupsPage";
import EMButton from "../UI/button/EMButton";

const WordGroupCard = ({group, profile, wordsListCallback, editCallback, addWordsCallback}) => {
    // group: id, owner, name

    return(
        <div>
            <b>{group.name}</b>
            <EMButton onClick={() => wordsListCallback(group)}>Список слов</EMButton>
            { group.owner === profile.id || profile.role === 'admin' 
                ? <div>
                    <EMButton onClick = {() => editCallback(group)}>Редактировать</EMButton>
                    <EMButton onClick = { () => addWordsCallback(group)}>Добавить слова</EMButton>
                 </div>
                : <div />
            }
        </div>
    )
}

export default WordGroupCard;