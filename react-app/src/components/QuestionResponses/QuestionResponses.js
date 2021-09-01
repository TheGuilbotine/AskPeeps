import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { getQuestions } from '../../store/question';
import { getQuestionResponses } from '../../store/response';

import './QuestionResponses.css'


export default function QuestionResponses({questionId}) {
    const dispatch = useDispatch();
    // const responses = Object.values(useSelector((state) => state.responses));
    const [responses, setResponses] = useState([])


    useEffect(() => {
        const questionResponses = dispatch(getQuestionResponses(questionId))
        setResponses(questionResponses)
    }, [dispatch])


    return (
        <div>
            {responses && responses?.map((response) => (
                <div key={response.id}>
                    {response?.username} {response.response}
                </div>
            ))}
        </div>
    )
}
