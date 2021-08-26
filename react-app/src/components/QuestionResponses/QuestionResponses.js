import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions } from '../../store/question';
import { getQuestionResponses } from '../../store/response';

import './QuestionResponses.css'


export default function QuestionResponses({questionId}) {
    const dispatch = useDispatch();
    // const responses = Object.values(useSelector((state) => state.responses));
    const [responses, setResponses] = useState([])
    console.log('------------------------------------');
    console.log(responses);
    console.log('------------------------------------');


    useEffect(() => {
        const questionResponses = dispatch(getQuestionResponses(questionId))
        setResponses(questionResponses)
    }, [dispatch])


    return (
        <div>
            {responses && responses?.map((response, idx) => (
                <div key={idx}>
                    {response?.username} {response.response}
                </div>
            ))}
        </div>
    )
}
