import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createQuestion } from '../../store/question';
import "./QuestionForm.css"

export default function QuestionForm() {
    const [errors, setErrors] = useState([]);
    // const [userId, setUserId] = useState([]);
    const [question, setQuestion] = useState([]);
    const [answered, setAnswered] = useState([]);
    const userId = useSelector((state => state.session.user.id))
    const dispatch = useDispatch();
    const history = useHistory();

    // useEffect(() => {
	// 	dispatch();
	// }, [dispatch]);

    const onCreate = async (e) => {
        e.preventDefault();
        const data = await dispatch(
            createQuestion(
                userId,
                question,
                answered
            )
        );
        if (data.errors) {
            setErrors(data.errors)
        }
    };

    const updateQuestion = (e) => {
        setQuestion(e.target.value);
    };
    const updateAnswered = (e) => {
        setAnswered(e.target.value);
    };

    // TODO: Add session links for session user

    return (
        <div>
            <form onSubmit={onCreate} className='question-form'>
                <div>
                    {errors?.map((error, idx) => (
                        <div key={idx}>{error}</div>
                    ))}
                </div>
                <div className='form-label__container'>
                    <input
                        className='form-input'
                        placeholder='What is your Question?'
                        type='text'
                        name='question'
                        onChange={updateQuestion}
                        value={question}
                        required={true}></input>
				</div>
                <div className='form-label__container'>
                    <label>Has your question been answered?</label>
                    <input
                        className='form-input__checkbox'
                        type='checkbox'
                        name='answered'
                        value={answered}
                        onChange={updateAnswered}></input>
				</div>
                <button className="question__submit-button" type='submit'>Ask peeps?</button>
            </form>
        </div>
    )
}
