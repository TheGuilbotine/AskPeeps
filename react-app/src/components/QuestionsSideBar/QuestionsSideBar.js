import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuestionForm from '../QuestionForm/QuestionForm';
import { createQuestion, getUserQuestions,getQuestions } from '../../store/question';
import './QuestionsSideBar.css'


export default function QuestionSideBar({optionsOn, setOptionsOn}) {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const sessionUser = useSelector((state) => state.session.user)
    const questions = useSelector((state) => state.session.user?.user_questions)

    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch])

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
                            <div key={question.id}>
                                {question.question}
                                <div>
                                    {question.responses && question.responses?.map((response) => (
                                        <div key={response.id}>
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
