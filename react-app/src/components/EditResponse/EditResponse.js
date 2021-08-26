import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions } from '../../store/question';
import { editResponse } from '../../store/response';

import './EditResponse.css';


export default function EditResponse({responseId, questionId}) {
    const responseToEdit = useSelector((state) => state.questions[questionId].responses[responseId]);
    const userId = useSelector((state) => state.session.user?.id);

    const [errors, setErrors] = useState([]);
    const [response, setResponse] = useState(''); // responseToEdit?.response


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
            dispatch(getQuestions())
            setResponse('')
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
				</div>
                <button className="question-edit__submit-button" type='submit'>Edit your tell?</button>
            </form>
        </div>
    )
}