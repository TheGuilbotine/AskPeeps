import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteResponse from './DeleteResponse';
import './DeleteResponse.css';

export default function DeleteQuestionModal({responseId, questionId}) {
	const [showModal, setShowModal] = useState(false);

	return (
        <>
            <button id='delete-response__button' onClick={() => setShowModal(true)}><i className="far fa-trash-alt"/></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteResponse responseId={responseId} questionId={questionId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>

	);
}
