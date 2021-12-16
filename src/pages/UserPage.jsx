import { useState } from "react";
import { useParams } from "react-router-dom";
import EMButton from "../components/UI/button/EMButton";
import PopupWindow from "../components/UI/popup/PopupWindow";
import EditUserForm from "../components/users/EditUserForm";
import WordGroupCard from "../components/wordgroups/WordGroupCard";
import { useProfile } from "../hooks/useProfile";
import { useProfileState } from "../hooks/useProfileState";
import { useUserWithGroups } from "../hooks/useUserWithGroups";
import { canEditUser } from "../logic/profileLogic"; 

const UserPage = () => {
    const params = useParams()
    const [user, isUserLoading, isError, groups, isGroupsLoading, updateUser, removeUser] = useUserWithGroups(params.id)
    const [profile, isProfileLoading] = useProfileState()

    const [isPopup, setIsPopup] = useState(false)


    function beginEditing() {
        setIsPopup(true)
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
        if (isProfileLoading || !canEditUser(profile, user)) return <div />
        else return (<div>
            <EMButton onClick={() => beginEditing()}>Редактировать</EMButton>
            <PopupWindow visible={isPopup} setVisible={setIsPopup}>
                <EditUserForm user={user} updateUser={(updateUser)}/>
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