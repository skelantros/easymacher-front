import { Modal, Row, Col, Form, Button, Container } from "react-bootstrap"
import { useEffect, useState } from "react"

const EditUserModal = ({show, closeCallback, user, updateCallback, removeCallback, showRemove}) => {
    const [usernameP, setUsername] = useState(user.username)
    const [firstNameP, setFirstName] = useState(user.firstName)
    const [lastNameP, setLastName] = useState(user.lastName)
    
    useEffect(() => {
        setUsername(user.username)
        setFirstName(user.firstName)
        setLastName(user.lastName)
    }, [user])

    async function onClose() {
        setUsername(user.username)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        closeCallback()
    }

    async function confirmUpdate(e) {
        e.preventDefault()
        await updateCallback(user.id, usernameP, firstNameP, lastNameP)
    }

    async function confirmRemove(e) {
        e.preventDefault()
        await removeCallback(user.id)
    }

    return(
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование пользователя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} controlId="nameForm">
                    <Form.Label column sm="2">Никнейм:</Form.Label>
                    <Col>
                        <Form.Control type="text" value={usernameP} onChange={e => setUsername(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="firstNameForm">
                    <Form.Label column sm="2">Имя:</Form.Label>
                    <Col>
                        <Form.Control type="text" value={firstNameP} onChange={e => setFirstName(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="lastNameForm">
                    <Form.Label column sm="2">Фамилия:</Form.Label>
                    <Col>
                        <Form.Control type="text" value={lastNameP} onChange={e => setLastName(e.target.value)} />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={confirmUpdate}>Изменить</Button>
                { showRemove ? <Button variant="danger" onClick={confirmRemove}>Удалить</Button> : <Container/>}
            </Modal.Footer>
        </Modal>
    )
}

export default EditUserModal;