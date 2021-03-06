import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { getQuestions } from '../../store/question';
// import QuestionSideBar from '../QuestionsSideBar/QuestionsSideBar'
import EditQuestion from '../EditQuestion/EditQuestion';
import ResponseForm from '../ResponseForm/ResponseForm';
import EditResponse from '../EditResponse/EditResponse';
import QuestionSideBar from '../QuestionsSideBar/QuestionsSideBar'
import ResponseDiv from '../ResponsesDiv/ResponseDiv';
// import QuestionResponses from '../QuestionResponses';
import DeleteQuestionModal from '../DeleteQuestion';
// import { destroyQuestion } from '../../store/question';
import { destroyResponse } from '../../store/response';
import { getUsersQuestions } from '../../store/userInfo';

import './Feed.css'


export default function FeedPage() {
    const dispatch = useDispatch();
    const questions = Object.values(useSelector((state) => state.questions)).reverse();
    const sessionUser = useSelector((state) => state.session.user)
    const [optionsOn, setOptionsOn] = useState(false);


    useEffect(() => {
        dispatch(getQuestions())
        dispatch(getUsersQuestions(sessionUser.id))
    }, [dispatch])


    const onDelete = (e, responseId, questionId) => {
        e.preventDefault();
        dispatch(destroyResponse(responseId, questionId))
    };

    const clickSidebar = ((e) => {
        e.stopPropagation()
        setOptionsOn(!optionsOn)

    })

    return (
        // onClick={(e)=> e.stopPropagation(), setOptionsOn(!optionsOn)}
        <div onClick={()=> setOptionsOn(false)} >
            {/* <QuestionSideBar /> */}
            <div className="feed-title__container">
                <h1>Hello {sessionUser?.username} welcome to the Questions Feed</h1>

            </div>
            <div>
                <button id='sidebar' className='question__sidebar-button' onClick={clickSidebar}>
                    {/* <i className="fas fa-question" /> */}
                    AskPeeps a Question?
                </button>
                {/* <button className='nav_sidebar_icons' onClick={()=> setOptionsOn(!optionsOn)}>
                    <i className="fas fa-question" />
                    Responses
                </button> */}
            </div>
            <div className="questions-feed__container">
                {questions && questions?.map((question) => (
                    <div className="question__container" key={question.id}  id={question.id}>
                        <div className="question-info__container">
                            <a><span className="title-text" name={question.id}>{question?.username} asked: </span>{question.question}</a>
                            {/* {sessionUser.id == question.user_id && <button className="delete--button" onClick={() => dispatch(destroyQuestion(question.id))}><i className="far fa-trash-alt" /></button>} */}
                            {sessionUser.id === question.user_id && <DeleteQuestionModal questionId={question?.id} />}
                            {sessionUser.id === question.user_id &&  <EditQuestion questionId={question?.id} />}
                        </div>
                        <ResponseDiv question={question} sessionUser={sessionUser} onDelete={onDelete} EditResponse={EditResponse} ResponseForm={ResponseForm}/>
                        {/* <span className="response__drop-down__button"  onClick={() => setShowResponsesDiv((responsesShown) => !responsesShown)}>See Responses and Respond</span> */}
                    </div>
                ))}
            </div>
            <QuestionSideBar optionsOn={optionsOn} setOptionsOn={setOptionsOn}/>
        </div>
    )

}
