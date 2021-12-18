import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWordGroup, getWordsOfGroup, removeGroup, rewriteWordsToGroup, updateGroup } from "../API/wordGroups";
import { getWords } from "../API/words";
import EMButton from "../components/UI/button/EMButton";
import EMDiv from "../components/UI/div/EMDiv";
import EMSelect from "../components/UI/select/EMSelect";
import WordCard from "../components/words/WordCard";
import { useFetching } from "../hooks/useFetching";
import { useProfile } from "../hooks/useProfile";
import { useTokenRequest } from "../hooks/useTokenRequest";
import { canEditGroup } from "../logic/profileLogic";
import classes from "./WordGroupPage.module.css";

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

    const [updateWordsMsg, setUpdateWordsMsg] = useState('')
    const [updateGroupMsg, setUpdateGroupMsg] = useState('')

    const router = useNavigate()


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
        setUpdateWordsMsg("Слова успешно заменены!")
    }

    async function confirmGroupChanges() {
        await makeRequest(t => updateGroup(t, group.id, name, isShared))
        setUpdateGroupMsg("Настройки группы успешно изменены!")
    }

    async function confirmRemoveGroup() {
        await makeRequest(t => removeGroup(t, group.id))
        router("/word-groups")
    }

    function canEdit() {
        return canEditGroup(profile, group)
    }

    useEffect(() => {
        fetchInfo()
    }, [])

    function showGroupWords() {
        return(
            <div className={classes.column}>
                <h2>Список слов:</h2>
                {groupWords.map(w => 
                    <WordCard key = {w.id} word={w}/>)
                }
            </div>
        )
    }

    function showGroupWordsEdit() {
        return(
            <div className={classes.column}>
                <h2>Список слов:</h2>
                {groupWords.map(w => 
                    <EMDiv key = {w.id} width={"30%"} right={<EMButton onClick={() => removeWordFromGroup(w)}>-</EMButton>} >
                        <WordCard key = {w.id} word={w}/>
                    </EMDiv>
                )
                }
            </div>
        )
    }

    function showRemWords() {
        return(
            <div className={classes.column}>
                <h2>Добавить слова:</h2>
                {remWords.map(w => 
                    <EMDiv key = {w.id} width={"30%"} right={<EMButton onClick={() => addWordToGroup(w)}>+</EMButton>} >
                        <WordCard key = {w.id} word={w}/>
                    </EMDiv>
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
                    ? <div>
                        <EMButton onClick={() => confirmGroupChanges()}>Изменить</EMButton>
                        <EMButton onClick={() => confirmRemoveGroup()}>Удалить</EMButton>
                        <p>{updateGroupMsg}</p>
                      </div>
                    : <div/>
                }
            </div>
        )
    }
    
    function showContent() {
        return(
            <div>
                {showInfo()}
                <div className={classes.row}>
                    { canEdit() ? showGroupWordsEdit() : showGroupWords() }
                    { canEdit() ? showRemWords() : <div/> }
                </div>
                { canEdit() 
                    ? <div>
                        <EMButton onClick={() => confirmWordChanges()}>Изменить слова</EMButton>
                        <p>{updateWordsMsg}</p>
                      </div> 
                    : <div/>}
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