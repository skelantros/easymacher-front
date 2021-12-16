import { useEffect, useState } from "react"
import { getWordGroupsByOwner } from "../../API/wordGroups"
import { useAuth0Token } from "../../hooks/useAuth0Token"
import { useFetching } from "../../hooks/useFetching"
import WordGroupCard from "./WordGroupCard"

const WordGroupsList = ({userId, profile}) => {
    const [getToken] = useAuth0Token()
    const [groups, setGroups] = useState([])
    const [fetchGroups, isGroupsLoading, setGroupsError] = useFetching(async () => {
        const token = await getToken()
        const response = await getWordGroupsByOwner(token, userId)
        setGroups(response.data)
    })

    function editGroup(group) {
        // TODO
    }

    function wordsListOfGroup(group) {
        // TODO
    }

    useEffect(() => {
        fetchGroups()
    }, [])

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

export default WordGroupsList;