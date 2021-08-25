import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions } from '../../store/question';

import './EditResponse.css';


export default function EditResponse({responseId}) {
    const responseToEdit = useSelector((state) => state.questions[questionId]);
    const userId = useSelector((state) => state.session.user?.id);

    const [errors, setErrors] = useState([]);
    const [question, setQuestion] = useState(questionToEdit?.question);
    const [answered, setAnswered] = useState(questionToEdit?.answered);


    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getQuestions());
    // }, [dispatch])

    const onEdit = async (e) => {
        e.preventDefault();
        setQuestion("Updating...")
        const data = await dispatch(
            editQuestion(
                questionId,
                userId,
                question,
                answered
            ),
        );
        if (data.errors) {
            setErrors(data.errors);
        } else {
            dispatch(getQuestions())
            setQuestion(data.question)
        }
    };
    const updateQuestion = (e) => {
        setQuestion(e.target.value);
    };
    const updateAnswered = (e) => {
        setAnswered(e.target.value);
    };

    return (
        <div>
            <form onSubmit={onEdit} className='edit-question__form'>
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
                <button className="question-edit__submit-button" type='submit'>Edit your ask?</button>
            </form>
        </div>
    )
}
