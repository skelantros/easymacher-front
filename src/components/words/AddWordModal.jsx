import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { addWord } from "../../API/words"
import { useAuth0Token } from "../../hooks/useAuth0Token"

const AddWordModal = ({show, addWordCallback, closeCallback}) => {
    const [word, setWord] = useState('')
    const [translate, setTranslate] = useState(null)
    const [type, setType] = useState('unknown')
    const [plural, setPlural] = useState(null)

    const [getToken] = useAuth0Token()

    function clean() {
        setWord('')
        setTranslate(null)
        setType('unknown')
        setPlural(null)
    }

    function close() {
        clean()
        closeCallback()
    }

    async function sendWord(e) {
        e.preventDefault()
        const token = await getToken()
        const {data: newWord} = await addWord(token, word, translate, type, plural)
        await addWordCallback(newWord)
        clean()
    }

    function isNoun() {
        return type === 'noun' || word.startsWith('der ') || word.startsWith('die ') || word.startsWith('das ')
    }

    return(
        <Modal show={show} onHide={() => close()}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить слово</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formWord">
                        <Form.Label>Слово</Form.Label>
                        <Form.Control type="text" value={word} onChange={e => setWord(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formTranslate">
                        <Form.Label>Перевод</Form.Label>
                        <Form.Control type="text" value={translate} onChange={e => setTranslate(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formType">
                        <Form.Label>Часть речи</Form.Label>
                        <Form.Select value={type} onChange={e => setType(e.target.value)}>
                            <option value="unknown">-</option>
                            <option value="noun">Имя существительное</option>
                        </Form.Select>
                    </Form.Group>
                    { isNoun() 
                        ? <Form.Group controlId="formPlural">
                            <Form.Label>Множественное число</Form.Label>
                            <Form.Control type="text" value={plural} onChange={e => setPlural(e.target.value)} />
                        </Form.Group>
                        : <p/>
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={sendWord}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddWordModal;