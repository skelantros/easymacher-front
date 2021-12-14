import react, { useEffect, useState } from "react"
import EMButton from "../UI/button/EMButton"
import EMSelect from "../UI/select/EMSelect"

const EditGroupForm = ({group, editCallback, removeCallback}) => {
    const [name, setName] = useState('')
    const [isShared, setIsShared] = useState(true)

    useEffect(() => {
        setName(group.name)
        setIsShared(group.isShared)
    }, [group])

    async function editGroup(e) {
        e.preventDefault()
        await editCallback(group, name, isShared)
    }

    async function removeGroup(e) {
        e.preventDefault()
        await removeCallback(group)
    }

    return(
        <form>
            <b>Название:</b>
            <input 
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <p/>
            <b>В общем доступе:</b>
            <EMSelect 
                value={isShared}
                options={[
                    {name: "да", value: true},
                    {name: "нет", value: false}
                ]}
                onChange={e => setIsShared(e.target.value === 'true')}
            />
            <p/>
            <EMButton onClick={(e) => editGroup(e)}>Изменить</EMButton>
            <EMButton onClick={(e) => removeGroup(e)}>Удалить</EMButton>
        </form>

    )
}

export default EditGroupForm;