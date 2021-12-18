import EMButton from "../UI/button/EMButton";
import WordCard from "../words/WordCard"

const GuessResult = ({score, wrongWords, endCallback, restartCallback}) => {
    function confirmEnd(e) {
        e.prevenDefault()
        endCallback()
    }

    function confirmRestart(e) {
        e.preventDefault()
        restartCallback()
    }

    return(
        <div>
            <p>Вы ответили правильно на <b>{score}</b> вопросов.</p>
            <p>Список слов, на которые вы ответили неправильно:</p>
            {wrongWords.map(w => <div><WordCard key={w.id} word={w}/><p/></div>)}
            <p/>
            <EMButton onClick={confirmEnd}>Завершить</EMButton>
            <EMButton onClick={confirmRestart}>Заново</EMButton>
        </div>
    )
}

export default GuessResult;