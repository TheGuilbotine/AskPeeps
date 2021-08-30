import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { destroyResponse } from '../../store/response';

import './DeleteResponse.css'

export default function DeleteResponse({responseId,questionId,  setShowModal}) {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        const deleted = dispatch(destroyResponse(responseId, questionId));
        if (deleted) {
            e.preventDefault();
            setShowModal(false);
            alert("Your response has been deleted!")
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
            <div className="delete-confirmation-message">
                <p className="confirmation-message">Are you sure you want to delete this response?</p>
            </div>
            <div className="delete-confirmation-buttons">
                <button className="delete-confirmation-button" onClick={handleDelete}>Delete</button>
                <button className="cancel-confirmation-button" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}
