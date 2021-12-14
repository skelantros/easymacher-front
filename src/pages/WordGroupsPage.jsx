import { useEffect, useState } from "react";
import { getWordGroupsByOwner, removeGroup, updateGroup } from "../API/wordGroups";
import PopupWindow from "../components/UI/popup/PopupWindow";
import AddWordGroup from "../components/wordgroups/AddWordGroup";
import EditGroupForm from "../components/wordgroups/EditGroupForm";
import WordGroupCard from "../components/wordgroups/WordGroupCard";
import WordGroupsList from "../components/wordgroups/WordGroupsList";
import { useAuth0Token } from "../hooks/useAuth0Token";
import { useFetching } from "../hooks/useFetching";
import { useProfile } from "../hooks/useProfile";

const WordGroupsPage = () => {
    // id, username, role, firstName, lastName
    const [profile, setProfile] = useState({})
    const [getProfile] = useProfile()
    const [groups, setGroups] = useState([])
    const [getToken] = useAuth0Token()
    
    const [editableGroup, setEditableGroup] = useState({})
    const [isEditActive, setIsEditActive] = useState(false)

    const [fetchProfile, isProfileLoading, setProfileError] = useFetching(async () => {
        const prof = await getProfile()
        setProfile(prof)
        fetchGroups()
    })

    const [fetchGroups, isGroupsLoading, setGroupsError] = useFetching(async () => {
        const token = await getToken()
        const response = await getWordGroupsByOwner(token, profile.id)
        setGroups(response.data)
        setEditableGroup(response.data[0])
    })

    useEffect(() => {
        fetchProfile()
    }, [])

    const addGroupToList = (group) => {
        setGroups([...groups, group])
    }

    function beginEditGroup(group) {
        setEditableGroup(group)
        setIsEditActive(true)
    }

    async function editGroup(group, name, isShared) {
        const token = await getToken()
        const response = await updateGroup(token, group.id, name, isShared)
        const newGroup = response.data
        setGroups([...groups.filter(g => g.id !== newGroup.id), newGroup])
        setIsEditActive(false)
    }

    async function deleteGroup(group) {
        const token = await getToken()
        const response = await removeGroup(token, group.id)
        setGroups(groups.filter(g => g.id !== group.id))
        setIsEditActive(false)
    }

    function wordsListOfGroup(group) {
        // TODO
    }

    function showGroups() {
        return (
            <div>
                { 
                    isGroupsLoading 
                    ? <p>Загрузка...</p>
                    : groups.map(g => <WordGroupCard key = {g.id} group={g} editCallback={beginEditGroup} wordsListCallback={wordsListOfGroup} profile={profile}/>)
                }
            </div>
        )
    }

    function showContent() {
        return (
            <div>
                <PopupWindow visible={isEditActive} setVisible={setIsEditActive}>
                    <EditGroupForm group={editableGroup} editCallback={editGroup} removeCallback ={deleteGroup} />
                </PopupWindow>
                <h2>Список групп: </h2>
                {showGroups()}
                <h2>Создать группу:</h2>
                <AddWordGroup addGroupCallback={addGroupToList} />
            </div>
        )
    }


    return(
        <div>
            {
                isProfileLoading
                ? <p>Загрузка...</p>
                : showContent()
            }
        </div>
    )
}

export default WordGroupsPage;