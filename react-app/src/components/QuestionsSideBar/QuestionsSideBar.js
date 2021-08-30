import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuestionForm from '../QuestionForm/QuestionForm';
import { getQuestions } from '../../store/question';
import { createQuestion, getUserQuestions } from '../../store/question';
import './QuestionsSideBar.css'


export default function QuestionSideBar({optionsOn, setOptionsOn}) {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const sessionUser = useSelector((state) => state.session.user)
    const questions = useSelector((state) => state.session.user?.user_questions)
    console.log('------------------------------------');
    console.log(questions[0].responses[0].response);
    console.log('------------------------------------');

    // useEffect(() => {
    //     dispatch(getUserQuestions(userId))
    // }, [dispatch])

    return (
        <>
            <div className="sidebar" style={!optionsOn ? {transform: 'translateX(100%)'} : {}}>
                <div className='sidebar_container'>
                    <div className="arrow-button" onClick={() => setOptionsOn(!optionsOn)}>
                        <i className="fas fa-arrow-right"></i>
                    </div>
                    <QuestionForm />
                    <div className="user-questions__container">
                        Your Questions:
                        {questions && questions?.map((question) => (
                            <div>
                                {question.question}
                                <div>
                                    {question.responses && question.responses?.map((response) => (
                                        <div>
                                            - {response.response}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
