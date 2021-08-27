import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getQuestions } from '../../store/question';
// import QuestionSideBar from '../QuestionsSideBar/QuestionsSideBar';
import QuestionForm from '../QuestionForm/QuestionForm';
import EditQuestion from '../EditQuestion/EditQuestion';
import ResponseForm from '../ResponseForm/ResponseForm';
import EditResponse from '../EditResponse/EditResponse';
// import QuestionResponses from '../QuestionResponses';
// import DeleteQuestionModal from '../DeleteQuestion';
import { destroyQuestion } from '../../store/question';
import { destroyResponse } from '../../store/response';

import './Feed.css'


export default function FeedPage() {
    const dispatch = useDispatch();
    const questions = Object.values(useSelector((state) => state.questions)).reverse();
    const sessionUser = useSelector((state) => state.session.user)
    const [optionsOn, setOptionsOn] = useState(false);
    const [showResponsesDiv, setShowResponsesDiv] = useState(false);


    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch, EditQuestion])


    const onDelete = (e, responseId, questionId) => {
        e.preventDefault();
        dispatch(destroyResponse(responseId, questionId))
    };

    return (
        <div>
            {/* <QuestionSideBar /> */}
            <div className="feed-title__container">
                <h1>Hello {sessionUser?.username} welcome to the Questions Feed</h1>

            </div>
            <div>
                <button className='nav_sidebar_icons' onClick={()=> setOptionsOn(!optionsOn)}>
                    {/* <i className="fas fa-question" /> */}
                    Question?
                </button>
                {/* <button className='nav_sidebar_icons' onClick={()=> setOptionsOn(!optionsOn)}>
                    <i className="fas fa-question" />
                    Responses
                </button> */}
            </div>
            <div className="questions-feed__container">
                {questions && questions?.map((question, idx) => (
                    <div className="question__container" key={idx}>
                        {question?.username}: {question.question}
                        <button className="delete-confirmation-button" onClick={() => dispatch(destroyQuestion(question.id))}>Delete</button>
                        <EditQuestion questionId={question?.id} />
                        <div className="response__drop-down__container" onClick={() => setShowResponsesDiv((responsesShown) => !responsesShown)}>
                            <span className="response__drop-down__button">Responses</span>
                            {showResponsesDiv && (
                                <div className="response__drop-down">
                                    {question.responses && question.responses?.map((response, idx) => (
                                        <div className="response__container">
                                            {response?.username} said, {response.response}
                                            <button className="delete-confirmation-button" onClick={(e) => onDelete(e, response.id, question.id)}>Delete</button>
                                            <EditResponse responseId={response?.id} questionId={question?.id} />
                                        </div>
                                    ))}
                                    {sessionUser && <ResponseForm questionId={question?.id} />}
                                </div>
                            )}
                        </div>
                        {/* <QuestionResponses questionId={question?.id} /> */}
                        {/* <DeleteQuestionModal questionId={question?.id} /> */}
                    </div>
                ))}
            </div>
            <div className="sidebar" style={!optionsOn ? {transform: 'translateX(100%)'} : {}}>
                <div className='sidebar_container'>
                    <div className="arrow-button" onClick={() => setOptionsOn(!optionsOn)}>
                        <i className="fas fa-arrow-right"></i>
                    </div>
                    <QuestionForm />
                </div>
            </div>
        </div>
    )

}
