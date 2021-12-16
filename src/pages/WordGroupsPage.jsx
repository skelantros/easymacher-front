import { useEffect, useState } from "react";
import { addWordsToGroup, getWordGroupsByOwner, removeGroup, updateGroup } from "../API/wordGroups";
import PopupWindow from "../components/UI/popup/PopupWindow";
import AddWordGroup from "../components/wordgroups/AddWordGroup";
import AddWordsToGroupForm from "../components/wordgroups/AddWordsToGroupForm";
import EditGroupForm from "../components/wordgroups/EditGroupForm";
import WordGroupCard from "../components/wordgroups/WordGroupCard";
import WordGroupsList from "../components/wordgroups/WordGroupsList";
import WordsListForm from "../components/wordgroups/WordsListForm";
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

    const [visitedGroup, setVisitedGroup] = useState({})
    const [isVisited, setIsVisited] = useState(false)

    const [addGroup, setAddGroup] = useState({})
    const [isAdd, setIsAdd] = useState(false)

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
        setVisitedGroup(response.data[0])
        setAddGroup(response.data[0])
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

    function beginVisitGroup(group) {
        setVisitedGroup(group)
        setIsVisited(true)
    }

    function endVisitGroup() {
        setIsVisited(false)
    }

    function beginAddGroup(group) {
        setAddGroup(group)
        setIsAdd(true)
    }

    function endAddGroup() {
        setIsAdd(false)
    }

    async function addWordToGroup(group, word) {
        const token = await getToken()
        const response = await addWordsToGroup(token, group.id, [word.id])
        group.words = [...group.words, response.data]
    }

    function showGroups() {
        return (
            <div>
                { 
                    isProfileLoading || isGroupsLoading 
                    ? <p>Загрузка...</p>
                    : groups.map(g => <WordGroupCard key = {g.id} group={g} editCallback={beginEditGroup} wordsListCallback={beginVisitGroup} profile={profile} addWordsCallback={beginAddGroup}/>)
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
                <PopupWindow visible={isVisited} setVisible={setIsVisited}>
                    <WordsListForm group={visitedGroup} profile={profile} closeCallback={endVisitGroup}/>
                </PopupWindow>
                <PopupWindow visible={isAdd} setVisible={setIsAdd}>
                    <AddWordsToGroupForm group={addGroup} closeCallback={endAddGroup} addWordCallback={addWordToGroup} />
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
                showContent()
            }
        </div>
    )
}

export default WordGroupsPage;