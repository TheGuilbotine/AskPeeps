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


    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch, EditQuestion])


    return (
        <div>
            {/* <QuestionSideBar /> */}
            <QuestionForm />
            <h1>Hello {sessionUser?.username} welcome to the Questions Feed</h1>
            {questions && questions?.map((question, idx) => (
                <div key={idx}>
                    {question?.username}: {question.question}
                    <button className="delete-confirmation-button" onClick={() => dispatch(destroyQuestion(question.id))}>Delete</button>
                    <EditQuestion questionId={question?.id} />
                    {question.responses && question.responses?.map((response, idx) => (
                        <div>
                            {response?.username} said, {response.response}
                            <button className="delete-confirmation-button" onClick={() => dispatch(destroyResponse(response.id))}>Delete</button>
                            <EditResponse responseId={response?.id} questionId={question?.id} />
                        </div>
                    ))}
                    {sessionUser && <ResponseForm questionId={question?.id} />}
                    {/* <QuestionResponses questionId={question?.id} /> */}
                    {/* <DeleteQuestionModal questionId={question?.id} /> */}
                </div>
            ))}

        </div>
    )

}
