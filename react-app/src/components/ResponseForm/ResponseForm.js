import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createResponse, getQuestionResponses } from '../../store/response';
import "./ResponseForm.css"


export default function ResponseForm({questionId}) {
    const [errors, setErrors] = useState([]);
    const [response, setResponse] = useState('');
    const userId = useSelector((state => state.session.user.id))
    // const questionId = useSelector((state => state.questions["questionId"]))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestionResponses(questionId));
    }, [dispatch])

    const onCreate = async (e) => {
        e.preventDefault();
        const data = await dispatch(
            createResponse(
                userId,
                questionId,
                response
            ),
        );
        // console.log('------------------------------------');
        // console.log(data);
        // console.log('------------------------------------');
        if (data.errors) {
            setErrors(data.errors)
        } else {
            dispatch(getQuestionResponses(questionId))
            setResponse('');
        }
    };

    const updateResponse = (e) => {
        setResponse(e.target.value);
    };


return (
    <div>
        <form onSubmit={onCreate} className='response-form'>
                <div>
                    {errors?.map((error, idx) => (
                        <div key={idx}>{error}</div>
                    ))}
                </div>
                <div className='form-label__container'>
                    <input
                        className='form-input'
                        placeholder='Have a response?'
                        type='text'
                        name='question'
                        onChange={updateResponse}
                        value={response}
                        required={true}></input>
				</div>
               <button className="response__submit-button" type='submit'>Tell peeps?</button>
            </form>
    </div>
)
}
