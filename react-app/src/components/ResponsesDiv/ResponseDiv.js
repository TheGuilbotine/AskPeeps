import React, { useState } from 'react';
import DeleteResponseModal from '../DeleteResponse';
import './ResponseDiv.css'


export default function ResponseDiv({question, sessionUser, onDelete, EditResponse, ResponseForm}) {
    const questionId = question.id
    const [showResponsesDiv, setShowResponsesDiv] = useState(false);

    return (
        <div id={question.id}  className="response__drop-down__container">
            {/* <span className="response__drop-down__button"  onClick={() => setShowResponsesDiv((false))}>Responses</span> */}
            {showResponsesDiv && (
                <div className="response__drop-down">
                    {sessionUser && <ResponseForm question={question} />}
                    <h2 className="responses-title">{question.responses.length ? "Responses:" : "Be the first to respond"}</h2>
                    {question.responses && question.responses?.map((response, idx) => (
                        <div key={response.id} className="response__container">
                            {response?.username} said, {response.response}
                            {/* {sessionUser.id == response.user_id &&  <button className="delete--button" onClick={(e) => onDelete(e, response.id, question.id)}><i className="far fa-trash-alt"/></button>} */}
                            {sessionUser.id === response.user_id && <DeleteResponseModal responseId={response?.id} questionId={question.id} />}
                            {sessionUser.id === response.user_id &&  <EditResponse responseId={response?.id} questionId={question?.id} />}
                        </div>
                    ))}
                </div>
            )}
            <span className="response__drop-down__button"  onClick={() => setShowResponsesDiv((responsesShown) => !responsesShown)}>{!showResponsesDiv ? "See Responses and Respond" : "Close Responses"}</span>
        </div>
    )
}
