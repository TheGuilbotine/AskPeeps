import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuestions } from '../../store/question';
import { createQuestion } from '../../store/question';
import './QuestionsSideBar.css'


export default function QuestionSIdeBar() {
    const dispatch = useDispatch();
    const { userId } = useParams();

    useEffect(() => {
        dispatch()
    }, [dispatch])
}
