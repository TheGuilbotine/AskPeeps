import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getQuestions } from '../../store/question';
import QuestionSideBar from '../QuestionsSideBar/QuestionsSideBar';
import QuestionForm from '../QuestionForm/QuestionForm';

import './Feed.css'


export default function FeedPage() {
    const dispatch = useDispatch();
    const questions = Object.values(useSelector((state) => state.questions));
    const sessionUser = useSelector((state) => state.session.user)
    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch])

    return (
        <div>
            {/* <QuestionSideBar /> */}
            <QuestionForm />
            <h1>Hello {sessionUser.username} welcome to the Questions Feed</h1>
            {questions && questions?.map((question, idx) => (
                <div key={idx}>
                    {question.username} asked the peeps community {question.question}
                </div>
            ))}

        </div>
    )

}
