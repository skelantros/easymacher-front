import { useState } from "react";
import { Button, Container, Placeholder, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import EMButton from "../components/UI/button/EMButton";
import PopupWindow from "../components/UI/popup/PopupWindow";
import EditUserForm from "../components/users/EditUserForm";
import EditUserModal from "../components/users/EditUserModal";
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
        setIsPopup(false)
    }

    async function makeRemove(id) {
        await removeUser()
        setIsPopup(false)
        router("/profile")
    }

    function showUsername() {
        return isUserLoading ? <Placeholder xs={2} /> : user.username
    }
    function showFirstName() {
        return isUserLoading ? <Placeholder xs={2} /> : user.firstName
    }
    function showLastName() {
        return isUserLoading ? <Placeholder xs={2} /> : user.lastName
    }
    function showGroupsList() {
        return isGroupsLoading ? <p>Загрузка...</p> : <Row>{groups.map(g => <WordGroupCard key={g.id} group={g}/>)}</Row>
    }
    function showEditButton() {
        if (isProfileLoading || isUserLoading || !canEditUser(profile, user)) return <div />
        else return (<div>
            <Button onClick={() => beginEditing()}>Редактировать</Button>
            {/* <PopupWindow visible={isPopup} setVisible={setIsPopup}>
                <EditUserForm user={user} updateCallback={makeEdit} removeCallback={makeRemove} showRemove={profile.id !== user.id}/>
            </PopupWindow> */}
            <EditUserModal 
                user={user} 
                updateCallback={makeEdit} 
                removeCallback={makeRemove} 
                showRemove={profile.id !== user.id} 
                show={isPopup} 
                closeCallback={() => setIsPopup(false)} 
            />
        </div>)
    }

    return(
        <Container>
            { isError
                ? <p>Ошибка при загрузке пользователя.</p>
                : <div>
                    <h2>{showUsername()}</h2>
                    <b>Имя: </b>{showFirstName()}<p/>
                    <b>Фамилия: </b>{showLastName()}<p/>
                    {showEditButton()}
                    <h3>Список групп:</h3>
                    {showGroupsList()}
                </div>
            }
        </Container>
    )
}

export default UserPage;