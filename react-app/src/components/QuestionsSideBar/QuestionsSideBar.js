import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import QuestionForm from '../QuestionForm/QuestionForm';
import DeleteQuestionModal from '../DeleteQuestion';
import EditQuestion from '../EditQuestion/EditQuestion';
// import { createQuestion, getUserQuestions, getQuestions } from '../../store/question';
import './QuestionsSideBar.css'
import { getUsersQuestions } from '../../store/userInfo';


export default function QuestionSideBar({optionsOn, setOptionsOn}) {
    const dispatch = useDispatch();
    // const { userId } = useParams();
    const sessionUser = useSelector((state) => state.session.user)
    const questions = useSelector((state) => Object.values(state.userInfo.questions))

    useEffect(() => {
        dispatch(getUsersQuestions(+sessionUser?.id))
        // TODO Check that sessionUser?.id doesnt break
    }, [dispatch, sessionUser?.id])

    return (
        <>
            <div className="sidebar" style={!optionsOn ? {transform: 'translateX(100%)'} : {}}>
                <div className='sidebar_container'>
                    <div className="arrow-button" onClick={() => setOptionsOn(!optionsOn)}>
                        <i className="fas fa-arrow-right"></i>
                    </div>
                    <QuestionForm questions={questions}/>
                    <div className="user-questions__container">
                        <h1>Your Questions:</h1>
                        <div className="user-questions__map-container">
                            {questions && questions?.map((question) => (
                                <div key={question.id}>
                                    {question.question}
                                    {sessionUser.id === question.user_id && <DeleteQuestionModal questionId={question?.id} />}
                                    {sessionUser.id === question.user_id && <EditQuestion questionId={question?.id} />}
                                    {/* TODO: add response map when response state updates correctly */}
                                    {/* <div>
                                        {question.responses && question.responses?.map((response) => (
                                            <div key={response.id}>
                                                - {response.response}
                                            </div>
                                        ))}
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
