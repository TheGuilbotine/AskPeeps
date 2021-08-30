import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editQuestion, getQuestions } from '../../store/question';

import "./EditQuestion.css"


export default function EditQuestion({responseId, questionId}) {
    const questionToEdit = useSelector((state) => state?.questions[questionId]);
    const userId = useSelector((state) => state.session.user?.id);

    const [errors, setErrors] = useState([]);
    const [question, setQuestion] = useState('');
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
            setQuestion('')
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
                        placeholder='Edit your question?'
                        type='text'
                        name='question'
                        onChange={updateQuestion}
                        value={question}
                        required={true}></input>
                <button className="question-edit__submit-button" type='submit'><i className="fas fa-edit"/></button>
				</div>
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
