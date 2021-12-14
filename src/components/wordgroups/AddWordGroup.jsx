import React, { useState } from "react"
import { createWordGroup } from "../../API/wordGroups"
import { useAuth0Token } from "../../hooks/useAuth0Token"
import EMButton from "../UI/button/EMButton"
import EMSelect from "../UI/select/EMSelect"

const AddWordGroup = ({errorCallback, addGroupCallback}) => {
    const [name, setName] = useState('')
    const [isShared, setIsShared] = useState(false)
    const [getToken] = useAuth0Token()

    async function sendGroup() {
        const token = await getToken()
        const response = await createWordGroup(token, name, isShared)
        addGroupCallback(response.data)
    }

    return(
        <div>
            <b>Название: </b>
            <input 
                placeholder="Название"
                onChange={e => setName(e.target.value) }
            />
            <p/>
            <b>В общем доступе:</b>
            <EMSelect 
                value = {isShared}
                options = {[
                    {name: "да", value: true},
                    {name: "нет", value: false}
                ]}
                onChange={v => setIsShared(v)}
            />
            <EMButton onClick={() => sendGroup()}>Создать</EMButton>
        </div>
    )
}

export default AddWordGroup;