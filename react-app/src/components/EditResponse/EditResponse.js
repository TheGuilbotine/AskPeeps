import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions } from '../../store/question';
import { editResponse } from '../../store/response';

import './EditResponse.css';


export default function EditResponse({responseId, questionId}) {
    const responsesToFilter = useSelector((state) => state?.questions[questionId]?.responses);
    const responsesFiltered = responsesToFilter.filter((response) => response.id === responseId)
    const responseToEdit = responsesFiltered[0].response;
    const userId = useSelector((state) => state.session.user?.id);

    const [errors, setErrors] = useState([]);
    const [response, setResponse] = useState(responseToEdit);
    const [showEditResponseForm, setShowEditResponseForm] = useState(false);


    const dispatch = useDispatch();

    const showEditForm = async (e) => {
        e.preventDefault();
        setShowEditResponseForm((responseEditFormShown) => !responseEditFormShown)
    }

    const onCancel = async (e) => {
        e.preventDefault();
        setResponse(responseToEdit)
        setShowEditResponseForm((responseEditFormShown) => !responseEditFormShown)
    }


    const onEdit = async (e) => {
        e.preventDefault();
        setResponse("Updating...")
        const data = await dispatch(
            editResponse(
                responseId,
                questionId,
                userId,
                response
            ),
        );
        if (data.errors) {
            setErrors(data.errors);
        } else {
            setResponse(data.response)
            dispatch(getQuestions())
            setShowEditResponseForm((responseEditFormShown) => !responseEditFormShown)
        }
    };
    const updateResponse = (e) => {
        setResponse(e.target.value);
    };

    // useEffect(() => {
    //     // dispatch(getQuestions());
    // }, [dispatch, onEdit])

    return (
        <div>
            {showEditResponseForm && <form onSubmit={onEdit} className='edit-response__form'>
                <div>
                    {errors?.map((error, idx) => (
                        <div key={idx}>{error}</div>
                    ))}
                </div>
                <div className='form-label__container'>
                    <input
                        className='form-input'
                        placeholder='Want to change your tell?'
                        type='text'
                        name='response'
                        onChange={updateResponse}
                        value={response}
                        required={true}></input>
                    {response !== responseToEdit && <button className="question-edit__submit-button" type='submit'>submit edit</button>}
                    {response !== responseToEdit && <button className="question__cancel-button" onClick={onCancel}>cancel</button>}
				</div>
            </form>}
            <button className="question-edit__submit-button" onClick={showEditForm}><i className="fas fa-edit"/></button>
        </div>
    )
}
