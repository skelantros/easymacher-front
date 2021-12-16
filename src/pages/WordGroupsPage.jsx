import { useEffect, useState } from "react";
import { addWordsToGroup, getWordGroupsByOwner, removeGroup, updateGroup } from "../API/wordGroups";
import PopupWindow from "../components/UI/popup/PopupWindow";
import AddWordGroupForm from "../components/wordgroups/AddWordGroupForm";
import AddWordsToGroupForm from "../components/wordgroups/AddWordsToGroupForm";
import EditGroupForm from "../components/wordgroups/EditGroupForm";
import WordGroupCard from "../components/wordgroups/WordGroupCard";
import WordGroupsList from "../components/wordgroups/WordGroupsList";
import WordsListForm from "../components/wordgroups/WordsListForm";
import { useAuth0Token } from "../hooks/useAuth0Token";
import { useFetching } from "../hooks/useFetching";
import { useProfile } from "../hooks/useProfile";
import EMButton from "../components/UI/button/EMButton";

const WordGroupsPage = () => {
    // id, username, role, firstName, lastName
    const [profile, setProfile] = useState({})
    const [getProfile] = useProfile()
    const [groups, setGroups] = useState([])
    const [getToken] = useAuth0Token()

    const [fetchProfile, isProfileLoading, setProfileError] = useFetching(async () => {
        const prof = await getProfile()
        setProfile(prof)
        fetchGroups()
    })

    const [fetchGroups, isGroupsLoading, setGroupsError] = useFetching(async () => {
        const token = await getToken()
        const response = await getWordGroupsByOwner(token, profile.id)
        setGroups(response.data)
    })

    useEffect(() => {
        fetchProfile()
    }, [])

    const [isPopup, setIsPopup] = useState(false)

    async function createGroup(group) {
        setGroups([...groups, group])
        setIsPopup(false)
    }


    function showGroups() {
        return (
            <div>
                { 
                    isProfileLoading || isGroupsLoading 
                    ? <p>Загрузка...</p>
                    : groups.map(g => <WordGroupCard key = {g.id} group={g} />)
                }
            </div>
        )
    }

    function showContent() {
        return (
            <div>
                <PopupWindow visible={isPopup} setVisible={setIsPopup}>
                    <AddWordGroupForm addGroupCallback={createGroup} />
                </PopupWindow>
                <EMButton onClick={() => setIsPopup(true)}>Создать группу</EMButton>
                <h2>Список групп: </h2>
                {showGroups()}
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