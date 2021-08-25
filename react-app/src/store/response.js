import { LOAD_QUESTIONS } from "./question";

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


const initialState = [];

// const sortList = (questions) => {

//     questions.sort((a, b) => {
//       if (a.question_name > b.question_name) {
//         return 1;
//       }
//       if (a.question_nam < b.question_nam) {
//         return -1;
//       }
//       return 0;
//     });

//     return questions.map(question => question.id);
// };

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
        default:
            return state;
    }
}


export default responsesReducer
