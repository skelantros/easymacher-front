import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWordGroup, getWordsOfGroup, rewriteWordsToGroup, updateGroup } from "../API/wordGroups";
import { getWords } from "../API/words";
import EMButton from "../components/UI/button/EMButton";
import EMSelect from "../components/UI/select/EMSelect";
import WordCard from "../components/words/WordCard";
import { useAuth0Token } from "../hooks/useAuth0Token";
import { useFetching } from "../hooks/useFetching";
import { useProfile } from "../hooks/useProfile";
import { useTokenRequest } from "../hooks/useTokenRequest";
import { canEditGroup } from "../logic/profileLogic";

const WordGroupPage = () => {
    const params = useParams()
    const [name, setName] = useState('')
    const [isShared, setIsShared] = useState(false)
    const [group, setGroup] = useState({})
    const [groupWords, setGroupWords] = useState([])
    const [remWords, setRemWords] = useState([])
    const [profile, setProfile] = useState({})
    const [getProfile] = useProfile()
    const [makeRequest] = useTokenRequest()


    const [fetchInfo, isLoading, setError] = useFetching(async () => {
        const id = params.id
        const prof = await getProfile()
        const groupData = await makeRequest(t => getWordGroup(t, id))
        const groupWordsData = await makeRequest(t => getWordsOfGroup(t, id)) // ok

        setProfile(prof)
        setGroup(groupData)
        setName(groupData.name)
        setIsShared(groupData.isShared)

        async function getUserWords() {
            if(canEditGroup(prof, groupData))
                return await makeRequest(getWords)
            else
                return []
        }

        const wordsData = await getUserWords()

        const groupWordsIdxs = groupWordsData.map(w => w.id)

        setRemWords(wordsData.filter(w => !groupWordsIdxs.includes(w.id)))
        setGroupWords(groupWordsData)
    })

    function addWordToGroup(word) {
        setRemWords(remWords.filter(w => w.id !== word.id))
        setGroupWords([...groupWords, word])
    }

    function removeWordFromGroup(word) {
        setRemWords([word, ...remWords])
        setGroupWords(groupWords.filter(w => w.id !== word.id))
    }
    
    async function confirmWordChanges() {
        await makeRequest(t => rewriteWordsToGroup(t, group.id, groupWords.map(w => w.id)))
    }

    async function confirmGroupChanges() {
        await makeRequest(t => updateGroup(t, group.id, name, isShared))
    }

    function canEdit() {
        return canEditGroup(profile, group)
    }


    useEffect(() => {
        fetchInfo()
    }, [])

    function showGroupWords() {
        return(
            <div>
                <h2>Список слов:</h2>
                {groupWords.map(w => 
                    <WordCard key = {w.id} word={w}/>)
                }
            </div>
        )
    }

    function showGroupWordsEdit() {
        return(
            <div>
                <h2>Список слов:</h2>
                {groupWords.map(w => 
                    <div key = {w.id}>
                        <WordCard key = {w.id} word={w}/>
                        <EMButton onClick={() => removeWordFromGroup(w)}>-</EMButton>
                    </div>
                )
                }
            </div>
        )
    }

    function showRemWords() {
        return(
            <div>
                <h2>Добавить слова:</h2>
                {remWords.map(w => 
                    <div key = {w.id}>
                        <WordCard word = {w} />
                        <EMButton onClick={() => addWordToGroup(w)}>+</EMButton>
                    </div>
                )}
            </div>
        )
    }

    function showInfo() {
        return(
            <div>
                <b>Название:</b>
                <input value={name} onChange={e => setName(e.target.value)} readOnly={!canEdit()}/>
                {canEdit() 
                    ? <div> 
                        <b>В общем доступе:</b>
                        <EMSelect 
                            value={isShared} 
                            onChange={e => setIsShared(e.target.value === "true")}
                            options={[
                                {name: "да", value: true},
                                {name: "нет", value: false}
                            ]}/>
                    </div>
                    : <div/>
                }
                {canEdit()
                    ? <EMButton onClick={() => confirmGroupChanges()}>Изменить</EMButton>
                    : <div/>
                }
            </div>
        )
    }
    
    function showContent() {
        return(
            <div>
                {showInfo()}
                { canEdit() ? showGroupWordsEdit() : showGroupWords() }
                { canEdit() ? showRemWords() : <div/> }
                { canEdit() ? <EMButton onClick={() => confirmWordChanges()}>Изменить слова</EMButton> : <div/>}
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