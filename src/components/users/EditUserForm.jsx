import { useEffect, useState } from "react";
import EMButton from "../UI/button/EMButton";

const EditUserForm = ({user, updateCallback, removeCallback, showRemove}) => {
    const [usernameP, setUsername] = useState(user.username)
    const [firstNameP, setFirstName] = useState(user.firstName)
    const [lastNameP, setLastName] = useState(user.lastName)
    const [error, setError] = useState('')
    
    useEffect(() => {
        setUsername(user.username)
        setFirstName(user.firstName)
        setLastName(user.lastName)
    }, [user])

    async function confirmUpdate(e) {
        e.preventDefault()
        await updateCallback(user.id, usernameP, firstNameP, lastNameP)
    }

    async function confirmRemove(e) {
        e.preventDefault()
        await removeCallback(user.id)
    }

    return(
        <form>
            <b>Имя пользователя:</b><input value={usernameP} onChange={e => setUsername(e.target.value)} /><p/>
            <b>Имя:</b><input value={firstNameP} onChange={e => setFirstName(e.target.value)} /><p/>
            <b>Фамилия:</b><input value={lastNameP} onChange={e => setLastName(e.target.value)} /><p/>
            <EMButton onClick={confirmUpdate}>Обновить</EMButton>
            { showRemove ? <EMButton onClick={confirmRemove}>Удалить</EMButton> : <div/>}<p/>
            <p>{error}</p>
        </form>
    )
}

export default EditUserForm;