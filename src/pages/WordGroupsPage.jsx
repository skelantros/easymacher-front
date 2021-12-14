import { useEffect, useState } from "react";
import { getWordGroupsByOwner } from "../API/wordGroups";
import AddWordGroup from "../components/wordgroups/AddWordGroup";
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

    const addGroupToList = (group) => {
        // TODO
    }

    function editGroup(group) {
        // TODO
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
                    : groups.map(g => <WordGroupCard key = {g.id} group={g} editCallback={editGroup} wordsListCallback={wordsListOfGroup} profile={profile}/>)
                }
            </div>
        )
    }

    function showContent() {
        return (
            <div>
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