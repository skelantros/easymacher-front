import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { createWordGroup } from "../../API/wordGroups"
import { useAuth0Token } from "../../hooks/useAuth0Token"

const AddWordGroupModal = ({show, addGroupCallback, closeCallback}) => {
    const [name, setName] = useState('')
    const [isShared, setIsShared] = useState(false)
    const [getToken] = useAuth0Token()

    async function sendGroup(e) {
        e.preventDefault()
        const token = await getToken()
        const response = await createWordGroup(token, name, isShared)
        addGroupCallback(response.data)
        setName('')
        setIsShared(false)
        closeCallback()
    }

    async function close() {
        setName('')
        setIsShared(false)
        closeCallback()
    }

    return(
        <Modal show={show} onHide={() => close()}>
            <Modal.Header closeButton>
                <Modal.Title>Создать группу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Название</Form.Label>
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formIsShared">
                        <Form.Label>В общем доступе</Form.Label>
                        <Form.Select value={isShared} onChange={e => setIsShared(e.target.value === 'true')}>
                            <option value={true}>Да</option>
                            <option value={false}>Нет</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={sendGroup}>Создать</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddWordGroupModal;