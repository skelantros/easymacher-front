import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWordGroup, getWordsOfGroup, removeGroup, rewriteWordsToGroup, updateGroup } from "../API/wordGroups";
import { getWords } from "../API/words";
import WordCard from "../components/words/WordCard";
import { useFetching } from "../hooks/useFetching";
import { useProfile } from "../hooks/useProfile";
import { useTokenRequest } from "../hooks/useTokenRequest";
import { canEditGroup } from "../logic/profileLogic";
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container";
import InputGroup  from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNameFilter } from "../hooks/useNameFilter"
import FormControl from "react-bootstrap/FormControl";

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

    const [groupFilter, setGroupFilter] = useState('')
    const [remFilter, setRemFilter] = useState('')
    const [filteredGroupWords] = useNameFilter(groupWords, w => w.word, groupFilter)
    const [filteredRemWords] = useNameFilter(remWords, w => w.word, remFilter)


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
        const newGroup = await makeRequest(t => updateGroup(t, group.id, name, isShared))
        setGroup(newGroup)
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
            <Col>
                <h3>Список слов:</h3>
                <InputGroup style={{ width: '18rem' }}>
                    <FormControl 
                        value={groupFilter}
                        onChange={e => setGroupFilter(e.target.value)}
                    />
                </InputGroup>
                {filteredGroupWords.map(w => 
                    <WordCard key = {w.id} word={w}/>
                )}
            </Col>
        )
    }

    function showGroupWordsEdit() {
        return(
            <Col>
                <h3>Список слов:</h3>
                <InputGroup style={{ width: '18rem' }}>
                    <FormControl
                        value={groupFilter}
                        onChange={e => setGroupFilter(e.target.value)}
                    />
                </InputGroup>
                {filteredGroupWords.map(w => 
                    <WordCard key = {w.id} word={w} content={<Button variant="danger" onClick={() => removeWordFromGroup(w)}>-</Button>}/>
                )}
            </Col>
        )
    }

    function showRemWords() {
        return(
            <Col>
                <h3>Добавить слова:</h3>
                <InputGroup style={{ width: '18rem' }}>
                    <FormControl
                        value={remFilter}
                        onChange={e => setRemFilter(e.target.value)}
                    />
                </InputGroup>
                {filteredRemWords.map(w => 
                    <WordCard key = {w.id} word={w}content={<Button variant="success" onClick={() => addWordToGroup(w)}>+</Button>} />
                )}
            </Col>
        )
    }

    function editForm() {
        return(
            <Form>
                <Form.Group as={Row} controlId="nameForm">
                    <Form.Label column sm="2"><b>Название:</b></Form.Label>
                    <Col sm="4">
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="isSharedForm">
                    <Form.Label column sm="2"><b>В общем доступе:</b></Form.Label>
                    <Col sm="2">
                        <Form.Select value={isShared} onChange={e => setIsShared(e.target.value === 'true')}>
                            <option value={true}>Да</option>
                            <option value={false}>Нет</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Button variant="secondary" className="mt-1" onClick={() => confirmGroupChanges()}>Изменить</Button>
                <Button variant="secondary" className="mx-2 mt-1" onClick={() => confirmWordChanges()}>Изменить слова</Button>
                <Button variant="danger" className="mt-1" onClick={() => confirmRemoveGroup()}>Удалить</Button>
                <p>{updateGroupMsg}</p>
                <p>{updateWordsMsg}</p>
            </Form>
        )
    }
    
    function showContent() {
        return(
            <Container>
                <Row><h2>{group.name}</h2></Row>
                {canEdit() 
                    ? <Row>{editForm()}</Row>
                    : <Row/>
                }
                <Row><h3>Начать игру:</h3></Row>
                <Row>
                    <Col>
                    <Button onClick={e => router(`/word-group/${group.id}/guess`)} style={{ width: '10rem' }}>Флеш-карточки</Button>
                    </Col>
                </Row>

                <Row>
                    { canEdit() ? showGroupWordsEdit() : showGroupWords() }
                    { canEdit() ? showRemWords() : <Col/> }
                </Row>
            </Container>
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