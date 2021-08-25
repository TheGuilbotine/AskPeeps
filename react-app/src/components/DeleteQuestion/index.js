import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteQuestion from './DeleteQuestion';
import './DeleteQuestion.css';

function DeleteQuestionModal({questionId}) {
	const [showModal, setShowModal] = useState(false);

	return (
        <>
            <button id='delete-question-button' onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteQuestion questionId={questionId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>

	);
}

export default DeleteQuestionModal;
