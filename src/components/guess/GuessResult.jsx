import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import WordCard from "../words/WordCard"

const GuessResult = ({score, wrongWords, endCallback, restartCallback}) => {
    function confirmEnd(e) {
        e.preventDefault()
        endCallback()
    }

    function confirmRestart(e) {
        e.preventDefault()
        restartCallback()
    }

    return(
        <Container>
            <Row>Вы ответили правильно на {score} вопросов.</Row>
            <Row>Список слов, на которые вы ответили неправильно:</Row>
            <Row>
                {wrongWords.map(w => <WordCard key={w.id} word={w}/>)}
            </Row>
            <Row>
                <Button onClick={confirmEnd} className="mt-1" style={{ width: '8rem' }}>Завершить</Button>
                <Button onClick={confirmRestart} className="mx-2 mt-1" style={{ width: '8rem' }}>Заново</Button>
            </Row>
        </Container>
    )
}

export default GuessResult;