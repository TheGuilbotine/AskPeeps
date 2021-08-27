import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getQuestions, getUserQuestions } from '../../store/question';
// import QuestionSideBar from '../QuestionsSideBar/QuestionsSideBar'
import EditQuestion from '../EditQuestion/EditQuestion';
import ResponseForm from '../ResponseForm/ResponseForm';
import EditResponse from '../EditResponse/EditResponse';
import QuestionSideBar from '../QuestionsSideBar/QuestionsSideBar'
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
                <button className='question__sidebar-button' onClick={()=> setOptionsOn(!optionsOn)}>
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
                        {sessionUser.id == question.user_id && <button className="delete-confirmation-button" onClick={() => dispatch(destroyQuestion(question.id))}>Delete</button>}
                        {sessionUser.id == question.user_id &&  <EditQuestion questionId={question?.id} />}
                        <div className="response__drop-down__container">
                            <span className="response__drop-down__button"  onClick={() => setShowResponsesDiv((responsesShown) => !responsesShown)}>Responses</span>
                            {showResponsesDiv && (
                                <div className="response__drop-down">
                                    {question.responses && question.responses?.map((response, idx) => (
                                        <div className="response__container">
                                            {response?.username} said, {response.response}
                                            {sessionUser.id == response.user_id &&  <button className="delete-confirmation-button" onClick={(e) => onDelete(e, response.id, question.id)}>Delete</button>}
                                            {sessionUser.id == response.user_id &&  <EditResponse responseId={response?.id} questionId={question?.id} />}
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
            <QuestionSideBar optionsOn={optionsOn} setOptionsOn={setOptionsOn}/>
        </div>
    )

}
