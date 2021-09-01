import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editQuestion, getQuestions } from '../../store/question';

import "./EditQuestion.css"


export default function EditQuestion({responseId, questionId}) {
    const questionToEdit = useSelector((state) => state?.questions[questionId]);
    const userId = useSelector((state) => state.session.user?.id);
    const [showEditQuestionForm, setShowEditQuestionForm] = useState(false);

    const [errors, setErrors] = useState([]);
    const [question, setQuestion] = useState(questionToEdit?.question);
    const [answered, setAnswered] = useState(questionToEdit?.answered);


    const dispatch = useDispatch();


    // const onSubmitFunc = (e) => {
        //     e.preventDefault();
        //     // dispatch(question)
        //     setQuestion(e.target.value)
        // }

        const onCancel = async (e) => {
            e.preventDefault();
            setQuestion(questionToEdit.question)
            setShowEditQuestionForm((questionFormShown) => !questionFormShown)
        }

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
            setShowEditQuestionForm((questionFormShown) => !questionFormShown)
        }
    };
    const updateQuestion = (e) => {
        setQuestion(e.target.value);
    };
    const updateAnswered = (e) => {
        setAnswered(e.target.value);
    };

    // useEffect(() => {
    //     dispatch(getQuestions());
    // }, [dispatch, onEdit])

    return (
        <div>
            {showEditQuestionForm && <form onSubmit={onEdit} className='edit-question__form'>
                <div>
                    {errors?.map((error, idx) => (
                        <div key={idx}>{error}</div>
                    ))}
                </div>
                <div className='form-label__container'>
                    <input
                        className='form-input edit-question__container'
                        placeholder='Edit your question?'
                        type='text'
                        name='question'
                        onChange={updateQuestion}
                        value={question}
                        required={true}></input>
                    {question !== questionToEdit.question && <button className="question__cancel-button" onClick={onCancel}>cancel</button>}
                    {question !== questionToEdit.question && <button className="question-edit__submit-button" onClick={onEdit}>submit edit</button>}
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
            </form>}
            <button className="question-edit__submit-button" onClick={() => setShowEditQuestionForm((questionFormShown) => !questionFormShown)}><i className="fas fa-edit"/></button>
        </div>
    )
}
