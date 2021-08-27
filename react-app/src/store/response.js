import { LOAD_QUESTIONS } from "./question";
import { getOneQuestion } from "./question";

export const LOAD_RESPONSES = 'responses/LOAD_RESPONSES';
export const CREATE_RESPONSE = 'responses/CREATE_RESPONSE';
export const DESTROY_RESPONSE = 'responses/DESTROY_RESPONSE'

const load = responses => ({
    type: LOAD_RESPONSES,
    responses,
})

const addResponse = response => ({
    type: CREATE_RESPONSE,
    response
})

const removeResponse = responseId => ({
    type: DESTROY_RESPONSE,
    responseId
})

export const getQuestionResponses = (questionId) => async dispatch => {
    const res = await fetch(`/api/responses/${questionId}`);

    if (res.ok) {
        const responses = await res.json();
        dispatch(load(responses.responses));
        return res;
    }
};

export const editResponse = (responseId, userId, questionId, response) => async dispatch => {
    const res = await fetch (`/api/responses/${responseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: responseId,
            user_id: userId,
            question_id: questionId,
            response
        })
    });
    const editedResponse = await res.json();
    if (res.ok) {
        dispatch(addResponse(editedResponse))
    }
    return editedResponse;
};

export const createResponse = (userId, questionId, response) => async dispatch => {
    const res = await fetch('/api/responses/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            question_id: questionId,
            response,
        })
    });
    const answer = await res.json();
    if (res.ok) {
        dispatch(addResponse(answer));
        return answer
    }
};

export const destroyResponse = (responseId, questionId) => async dispatch => {
    console.log('---------------THUNK---------------------');
    console.log(responseId, questionId);
    console.log('------------------------------------');
    const deleted = await fetch(`/api/responses/${responseId}`, {
        method: 'DELETE'
    });
    if (deleted) {
        dispatch(removeResponse(responseId))
        dispatch(getOneQuestion(questionId))
        return deleted;
    }
};


const responsesReducer = (state = {}, action) => {
    if (!action) return state;
    switch (action.type) {
        case LOAD_RESPONSES: {
            const newState = {};
            action.responses.forEach(response => {
                newState[response.id] = response
            })
            return newState;
        }
        case CREATE_RESPONSE: {
            const newState = {
                ...state,
                [action.response.id]: action.response
            };
            return newState;
        }
        case DESTROY_RESPONSE: {
            const newState = {...state};
            delete newState[action.responseId]
            return newState
        }
        default:
            return state;
    }
}


export default responsesReducer
