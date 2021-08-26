export const LOAD_QUESTIONS = 'questions/LOAD_QUESTIONS';
export const CREATE_QUESTION = 'questions/CREATE_QUESTION';
export const DESTROY_QUESTION = 'questions/DESTROY_QUESTION'

const load = questions => ({
    type: LOAD_QUESTIONS,
    questions,
})

const addQuestion = question => ({
    type: CREATE_QUESTION,
    question
})

const removeQuestion = questionId => ({
    type: DESTROY_QUESTION,
    questionId
})

export const getQuestions = () => async dispatch => {
    const res = await fetch('/api/questions/');

    if (res.ok) {
        const questions = await res.json();
        dispatch(load(questions.questions));
        return res;
    }
};

// TODO: Get all questions of one user
export const getUserQuestions = (id) => async dispatch => {
    const res = await fetch(`/api/users/${id}/`)

    if (res.ok) {
        const questions = await res.json();
        dispatch(load(questions.questions));
        return res;
    }
};
// TODO: Get one question(might not be necessary)

export const createQuestion = (userId, question, answered) => async dispatch => {
    const res = await fetch('/api/questions/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            question,
            answered,
        })
    });
    const asked_question = await res.json();
    if (res.ok) {
        dispatch(addQuestion(asked_question));
        return asked_question
    }
};

export const editQuestion = (questionId, userId, question, answered) => async dispatch => {
    const res = await fetch (`/api/questions/${questionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: questionId,
            user_id: userId,
            question,
            answered
        })
    });
    const editedQuestion = await res.json();
    if (res.ok) {
        dispatch(addQuestion(editedQuestion))
    }
    return editedQuestion;
};

export const destroyQuestion = (questionId) => async dispatch => {
    const deleted = await fetch(`/api/questions/${questionId}`, {
        method: 'DELETE'
    });
    if (deleted) {
        dispatch(removeQuestion(questionId))
        return deleted;
    }
};



const initialState = [];

const sortList = (questions) => {

    questions.sort((a, b) => {
      if (a.id > b.id) {
        return -1;
      }
      if (a.id < b.id) {
        return 1;
      }
      return 0;
    });

    return questions.map(question => question.question);
};


const questionsReducer = (state = {}, action) => {
    if (!action) return state;
    switch (action.type) {
        case LOAD_QUESTIONS: {
            const newState = {};
            action.questions.forEach(question => {
                newState[question.id] = question
            })
            return newState;
        }
        case CREATE_QUESTION: {
            const newState = {
                ...state,
                [action.question.id]: action.question
            };
            return newState;
            // return {
            //     ...newState,
            //     ...state,
            //     questions: sortList(action.questions),
            //   };
        }
        case DESTROY_QUESTION: {
            const newState = {...state};
            delete newState[action.questionId]
            return newState
        }
        default:
            return state;
    }
}



export default questionsReducer;
