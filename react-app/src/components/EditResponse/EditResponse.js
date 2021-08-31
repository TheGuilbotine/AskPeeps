import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions } from '../../store/question';
import { editResponse } from '../../store/response';

import './EditResponse.css';


export default function EditResponse({responseId, questionId}) {
    const responsesToFilter = useSelector((state) => state?.questions[questionId]?.responses);
    const responsesFiltered = responsesToFilter.filter((response) => response.id === responseId)
    const responseToEdit = responsesFiltered[0].response
    const userId = useSelector((state) => state.session.user?.id);

    const [errors, setErrors] = useState([]);
    const [response, setResponse] = useState(responseToEdit);


    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getQuestions());
    // }, [dispatch])

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
        }
    };
    const updateResponse = (e) => {
        setResponse(e.target.value);
    };

    return (
        <div>
            <form onSubmit={onEdit} className='edit-response__form'>
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
                    {response !== responseToEdit && <button className="question-edit__submit-button" type='submit'><i className="fas fa-edit" /></button>}
                    {response !== responseToEdit && <button className="question__cancel-button" onClick={(() => setResponse(responseToEdit))}>cancel</button>}
				</div>
            </form>
        </div>
    )
}
