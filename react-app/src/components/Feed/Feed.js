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

    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch])

    return (
        <div>
            <h1>Questions Feed</h1>
            {questions && questions?.map((question) => (
                <div>
                    {question.username}
                    {question.question}
                    {/* <QuestionSideBar /> */}
                    <QuestionForm />
                </div>
            ))}

        </div>
    )

}
