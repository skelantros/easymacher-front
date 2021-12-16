import React, { useState } from "react"
import { createWordGroup } from "../../API/wordGroups"
import { useAuth0Token } from "../../hooks/useAuth0Token"
import EMButton from "../UI/button/EMButton"
import EMSelect from "../UI/select/EMSelect"

const AddWordGroupForm = ({errorCallback, addGroupCallback}) => {
    const [name, setName] = useState('')
    const [isShared, setIsShared] = useState(false)
    const [getToken] = useAuth0Token()

    async function sendGroup() {
        const token = await getToken()
        const response = await createWordGroup(token, name, isShared)
        addGroupCallback(response.data)
    }

    return(
        <form>
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
                onChange={e => setIsShared(e.target.value === 'true')}
            />
            <EMButton onClick={() => sendGroup()}>Создать</EMButton>
        </form>
    )
}

export default AddWordGroupForm;