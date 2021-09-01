import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getQuestions } from '../../store/question';
import { destroyResponse, getQuestionResponses } from '../../store/response';

import './DeleteResponse.css'

export default function DeleteResponse({responseId,questionId,  setShowModal}) {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        const deleted = dispatch(destroyResponse(responseId, questionId));
        if (deleted) {
            e.preventDefault();
            alert("Your response has been deleted!")
            dispatch(getQuestions())
            // await dispatch(getQuestionResponses())
            // TODO qetUserINfo
            // dispatch(getUser)
            setShowModal(false);
        } else {
            alert("Please try again")
        }
    };

    const handleCancel = ((e) => {
        e.preventDefault();
        setShowModal(false)
    });

    return (
        <div>
            <div className="delete-confirmation__message">
                <p className="confirmation__message">Are you sure you want to delete this response?</p>
            </div>
            <div className="delete-confirmation__buttons">
                <button className="delete-confirmation__button" onClick={handleDelete}>Delete</button>
                <button className="cancel-confirmation__button" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}
