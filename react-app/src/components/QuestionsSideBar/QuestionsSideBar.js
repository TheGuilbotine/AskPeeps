import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuestions } from '../../store/question';
import { createQuestion, getUserQuestions } from '../../store/question';
import './QuestionsSideBar.css'


export default function QuestionSideBar() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const questions = Object.values(useSelector((state) => state.session.user))

    useEffect(() => {
        dispatch(getUserQuestions(userId))
    }, [dispatch])

    return (
        <div>
            <h2>Questions</h2>
        </div>
    )
}
