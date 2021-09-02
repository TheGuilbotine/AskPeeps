export const LOAD_USER_INFO = 'questions/LOAD_USER_INFO';
export const CREATE_USER_QUESTION = 'questions/CREATE_USER_QUESTION';
export const DESTROY_USER_QUESTION = 'questions/DESTROY_USER_QUESTION'

const load = information => ({
    type: LOAD_USER_INFO,
    information,
})

const addUserQuestion = asked_question => ({
    type: CREATE_USER_QUESTION,
    asked_question,
})

const removeUserQuestion = questionId => ({
    type: DESTROY_USER_QUESTION,
    questionId,
})

export const getUsersQuestions = (userId) => async dispatch => {
    const res = await fetch(`/api/questions/${userId}`)

    if (res.ok) {
        const users_questions = await res.json();
        dispatch(load(users_questions));
        return res;
    }
};

export const destroyUserQuestion = (questionId) => async dispatch => {
    dispatch(removeUserQuestion(questionId));
};

export const createUserQuestion = (asked_question) => async dispatch => {
    dispatch(addUserQuestion(asked_question))
};

export const editUserQuestion = (editedQuestion) => async dispatch => {
    dispatch(addUserQuestion(editedQuestion))
};



const initialState = {questions: {}, responses: {}}

export default function userInfoReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_USER_INFO:
            const newState = {questions: {...state.questions}, responses: {...state.responses}}
            //  TODO add responses to newState
            newState.questions = action.information
            return newState
        case CREATE_USER_QUESTION:
            const newCreateState = {questions: {...state.questions, [action.asked_question.id]: action.asked_question} , responses: {...state.responses}}
            return newCreateState
        case DESTROY_USER_QUESTION:
            const newDeleteState = {questions: {...state.questions}, responses: {...state.responses}}
            delete newDeleteState.questions[action.questionId]
            return newDeleteState
        default:
            return state
    }
}
