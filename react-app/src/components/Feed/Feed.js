import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getQuestions } from '../../store/question';
// import QuestionSideBar from '../QuestionsSideBar/QuestionsSideBar';
import QuestionForm from '../QuestionForm/QuestionForm';
import EditQuestion from '../EditQuestion/EditQuestion';
// import QuestionResponses from '../QuestionResponses';
// import DeleteQuestionModal from '../DeleteQuestion';
import { destroyQuestion } from '../../store/question';

import './Feed.css'


export default function FeedPage() {
    const dispatch = useDispatch();
    const questions = Object.values(useSelector((state) => state.questions));
    const sessionUser = useSelector((state) => state.session.user)
    useEffect(() => {
        dispatch(getQuestions())
        // TODO: Add getUsers so that the question populates with username without refresh
    }, [dispatch])


    return (
        <div>
            {/* <QuestionSideBar /> */}
            <QuestionForm />
            <h1>Hello {sessionUser.username} welcome to the Questions Feed</h1>
            {questions && questions?.map((question, idx) => (
                <div key={idx}>
                    {question?.username}: {question.question}
                    <button className="delete-confirmation-button" onClick={() => dispatch(destroyQuestion(question.id))}>Delete</button>
                    <EditQuestion questionId={question?.id} />
                    {question.responses && question.responses?.map((response, idx) => (
                        <div>
                            {response?.username} said, {response.response}
                        </div>
                    ))}
                    {/* <QuestionResponses questionId={question?.id} /> */}
                    {/* <DeleteQuestionModal questionId={question?.id} /> */}
                </div>
            ))}

        </div>
    )

}
