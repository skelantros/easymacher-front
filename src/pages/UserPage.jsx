import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EMButton from "../components/UI/button/EMButton";
import PopupWindow from "../components/UI/popup/PopupWindow";
import EditUserForm from "../components/users/EditUserForm";
import WordGroupCard from "../components/wordgroups/WordGroupCard";
import { useProfile } from "../hooks/useProfile";
import { useProfileState } from "../hooks/useProfileState";
import { useUserWithGroups } from "../hooks/useUserWithGroups";
import { canEditUser, isAdmin } from "../logic/profileLogic"; 

const UserPage = () => {
    const params = useParams()
    const [user, isUserLoading, isError, groups, isGroupsLoading, updateUser, removeUser] = useUserWithGroups(params.id)
    const [profile, isProfileLoading] = useProfileState()
    const router = useNavigate()

    const [isPopup, setIsPopup] = useState(false)


    function beginEditing() {
        setIsPopup(true)
    }

    async function makeEdit(id, username, firstName, lastName) {
        await updateUser(username, firstName, lastName)
    }

    async function makeRemove(id) {
        await removeUser()
        setIsPopup(false)
        router("/profile")
    }

    function showUsername() {
        return isUserLoading ? "Загрузка..." : user.username
    }
    function showFirstName() {
        return isUserLoading ? "Загрузка..." : user.firstName
    }
    function showLastName() {
        return isUserLoading ? "Загрузка..." : user.lastName
    }
    function showGroupsList() {
        return isGroupsLoading ? <p>Загрузка...</p> : <div>{groups.map(g => <WordGroupCard key={g.id} group={g}/>)}</div>
    }
    function showEditButton() {
        if (isProfileLoading || isUserLoading || !canEditUser(profile, user)) return <div />
        else return (<div>
            <EMButton onClick={() => beginEditing()}>Редактировать</EMButton>
            <PopupWindow visible={isPopup} setVisible={setIsPopup}>
                <EditUserForm user={user} updateCallback={makeEdit} removeCallback={makeRemove} showRemove={profile.id !== user.id}/>
            </PopupWindow>
        </div>)
    }

    return(
        <div>
            { isError 
                ? <p>Ошибка при загрузке пользователя.</p>
                : <div>
                    <h2>{showUsername()}</h2>
                    <b>Аватарка</b><p/>
                    <b>Имя: </b>{showFirstName()}<p/>
                    <b>Фамилия: </b>{showLastName()}<p/>
                    {showEditButton()}
                    <h3>Список групп:</h3>
                    {showGroupsList()}
                </div>
            }
        </div>
    )
}

export default UserPage;