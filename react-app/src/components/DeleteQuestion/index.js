import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteQuestion from './DeleteQuestion';
import './DeleteQuestion.css';

function DeleteQuestionModal({questionId}) {
	const [showModal, setShowModal] = useState(false);

	return (
        <>
            <button id='delete-question__button' onClick={() => setShowModal(true)}><i className="far fa-trash-alt" /></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteQuestion questionId={questionId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>

	);
}

export default DeleteQuestionModal;
