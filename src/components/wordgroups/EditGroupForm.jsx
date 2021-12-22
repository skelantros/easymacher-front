import react, { useEffect, useState } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const EditGroupForm = ({group, editCallback, removeCallback}) => {
    const [name, setName] = useState(group.name)
    const [isShared, setIsShared] = useState(group.isShared)

    useEffect(() => {
        setName(group.name)
        setIsShared(group.isShared)
    }, [])

    async function editGroup(e) {
        e.preventDefault()
        await editCallback(group, name, isShared)
    }

    async function removeGroup(e) {
        e.preventDefault()
        await removeCallback(group)
    }

    return(
        <Form>
            <Form.Group as={Row} controlId="nameForm">
                <Form.Label column sm="2">Название:</Form.Label>
                <Col>
                    <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="isSharedForm">
                <Form.Label column sm="2">В общем доступе:</Form.Label>
                <Col>
                    <Form.Select value={isShared} onChange={e => setIsShared(e.target.value === 'true')}>
                        <option value={true}>Да</option>
                        <option value={false}>Нет</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Button variant="secondary" onClick={(e) => editGroup(e)}>Изменить</Button>
            <Button variant="danger" onClick={(e) => removeGroup(e)}>Удалить</Button>
        </Form>
    )
}

export default EditGroupForm;