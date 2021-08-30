import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions } from '../../store/question';
import { createResponse, getQuestionResponses } from '../../store/response';
import "./ResponseForm.css"


export default function ResponseForm({questionId}) {
    const [errors, setErrors] = useState([]);
    const [response, setResponse] = useState('');
    const userId = useSelector((state => state.session.user.id))
    const user = useSelector((state => state.session.user))
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
        if (data.errors) {
            setErrors(data.errors)
        } else {
            dispatch(getQuestionResponses(questionId))
            dispatch(getQuestions())
            setResponse('');
            alert("Your response has been added.")
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
                <div className='form-label__container question-label__container'>
                    Hey {user.username},
                    <input
                        className='form-input question-input'
                        placeholder='Do you have a response?'
                        type='text'
                        name='question'
                        onChange={updateResponse}
                        value={response}
                        required={true}></input>
                    {response && <button className="response__submit-button" type='submit'>Tell peeps?</button>}
                    {response && <button className="response__cancel-button" onClick={(() => setResponse(''))}>cancel</button>}
				</div>
            </form>
    </div>
)
}
