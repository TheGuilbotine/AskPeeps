import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createQuestion, getQuestions } from '../../store/question';
import "./QuestionForm.css"

export default function QuestionForm({questions}) {
    const [errors, setErrors] = useState([]);
    // const [userId, setUserId] = useState([]);
    const [question, setQuestion] = useState('');
    // TODO Readd setAnswered
    const [answered] = useState('');
    // const username = useSelector((state) => state.session.user.username)
    const userId = useSelector((state => state.session.user.id))
    const dispatch = useDispatch();
    // const history = useHistory();


    const onCreate = async (e) => {
        e.preventDefault();
        const data = await dispatch(
            createQuestion(
                userId,
                question,
                answered
            ),
        );
        if (data.errors) {
            setErrors(data.errors)
        } else {
            dispatch(getQuestions())
            // dispatch(getUserQuestions(userId))
            setQuestion('');
            alert("Your question has been asked")
        }
    };

    // useEffect(() => {
    //     // dispatch(getQuestions());
    // }, [dispatch, onCreate]);

    const updateQuestion = (e) => {
        setQuestion(e.target.value);
    };

    // const updateAnswered = (e) => {
    //     setAnswered(e.target.value);
    // };

    // TODO: Add session links for session user

    return (
        <div>
            <form onSubmit={onCreate} className='question-form'>
                <div>
                    {errors?.map((error, idx) => (
                        <div key={idx}>{error}</div>
                    ))}
                </div>
                <div className='form-label__container question-form__container'>
                    <input
                        className='form-input'
                        placeholder='What is your Question?'
                        type='text'
                        name='question'
                        onChange={updateQuestion}
                        value={question}
                        required={true}
                    ></input>
                    {question && <button className="question__submit-button" type='submit'>AskPeeps</button>}
				</div>
                {question && <button className="question__cancel-button" onClick={(() => setQuestion(''))}>cancel</button>}
                {/* <div className='form-label__container'>
                    <label>Has your question been answered?</label>
                    <input
                        className='form-input__checkbox'
                        type='checkbox'
                        name='answered'
                        value={answered}
                        onChange={updateAnswered}></input>
				</div> */}
            </form>
        </div>
    )
}
