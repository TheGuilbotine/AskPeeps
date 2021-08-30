import React, { useState } from 'react';
import DeleteResponseModal from '../DeleteResponse';
import './ResponseDiv.css'


export default function ResponseDiv({question, sessionUser, showResponsesDiv, setShowResponsesDiv, onDelete, EditResponse, ResponseForm}) {


    return (
        <div className="response__drop-down__container">
            {/* <span className="response__drop-down__button"  onClick={() => setShowResponsesDiv((responsesShown) => !responsesShown)}>Responses</span> */}
            {showResponsesDiv && (
                <div className="response__drop-down">
                    {sessionUser && <ResponseForm questionId={question?.id} />}
                    <h2 className="responses-title">Responses:</h2>
                    {question.responses && question.responses?.map((response, idx) => (
                        <div key={idx} className="response__container">
                            {response?.username} said, {response.response}
                            {/* {sessionUser.id == response.user_id &&  <button className="delete--button" onClick={(e) => onDelete(e, response.id, question.id)}><i className="far fa-trash-alt"/></button>} */}
                            {sessionUser.id == response.user_id && <DeleteResponseModal responseId={response.id} questionId={question.id} />}
                            {sessionUser.id == response.user_id &&  <EditResponse responseId={response?.id} questionId={question?.id} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
