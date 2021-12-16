import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWordGroup, getWordsOfGroup } from "../API/wordGroups";
import { getWords } from "../API/words";
import { useAuth0Token } from "../hooks/useAuth0Token";
import { useFetching } from "../hooks/useFetching";
import { useProfile } from "../hooks/useProfile";
import { canEditGroup } from "../logic/profileLogic";

const WordGroupPage = () => {
    const params = useParams()
    const [group, setGroup] = useState({})
    const [groupWords, setGroupWords] = useState([])
    const [remWords, setRemWords] = useState([])
    const [profile, setProfile] = useState({})
    const [getToken] = useAuth0Token()
    const [getProfile] = useProfile()

    const [fetchInfo, isLoading, setError] = useFetching(async () => {
        const id = params.id
        const token = await getToken()
        const profile = await getProfile()
        const groupResponse = await getWordGroup(token, id)
        const groupWordsResponse = await getWordsOfGroup(token, id)
        const wordsResponse = await getWords(token)

        setProfile(profile)
        setGroup(groupResponse.data)
        setRemWords(wordsResponse.data)
        groupWordsResponse.data.forEach(addWordToGroup)
    })

    function addWordToGroup(word) {
        setRemWords(remWords.filter(w => w.id !== word.id))
        setGroupWords([...groupWords, word])
    }

    useEffect(() => {
        fetchInfo()
    }, [])

    function showGroupWords() {
        // TODO
    }

    function showGroupWordsEdit() {
        // TODO
    }

    function showRemWords() {
        // TODO
    }

    function showInfo() {
        // TODO
    }
    
    function showContent() {
        return(
            <div>
                {showInfo()}
                { canEditGroup(profile, group) ? showGroupWordsEdit() : showGroupWords() }
                { canEditGroup(profile, group) ? showRemWords() : <div/> }
            </div>
        )
    }


    return(
        <div>
            {
                isLoading
                ? <p>Загрузка...</p>
                : showContent()
            }
        </div>
    )
}

export default WordGroupPage;