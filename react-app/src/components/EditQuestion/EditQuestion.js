import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editQuestion, getQuestions } from '../../store/question';
// import { getUsersQuestions } from '../../store/userInfo';

import "./EditQuestion.css"


export default function EditQuestion({responseId, questionId}) {
    const questionToEdit = useSelector((state) => state?.questions[questionId]);
    const userId = useSelector((state) => state.session.user?.id);
    const [showEditQuestionForm, setShowEditQuestionForm] = useState(false);

    const [errors, setErrors] = useState([]);
    const [question, setQuestion] = useState(questionToEdit?.question);
    // TODO Readd setAnswered
    const [answered] = useState(questionToEdit?.answered);


    const dispatch = useDispatch();


    // const onSubmitFunc = (e) => {
        //     e.preventDefault();
        //     // dispatch(question)
        //     setQuestion(e.target.value)
        // }

        const showEditForm = async (e) => {
            e.preventDefault();
            setQuestion(questionToEdit?.question)
            setShowEditQuestionForm((questionFormShown) => !questionFormShown)
            // await dispatch(getUsersQuestions(userId))
        }

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

    // const updateAnswered = (e) => {
    //     setAnswered(e.target.value);
    // };

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
            <button className="question-edit__submit-button" onClick={showEditForm}><i className="fas fa-edit"/></button>
        </div>
    )
}
