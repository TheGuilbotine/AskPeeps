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
    const res = await fetch('/api/questions');

    if (res.ok) {
        const questions = await res.json();
        console.log('------------------------------------');
        console.log(questions);
        console.log('------------------------------------');
        dispatch(load(questions.questions));
        return res;
    }
};

// TODO: Get all questions of one user
// TODO: Get one question(might not be necessary)

export const createQuestion = (userId, question, answered) => async dispatch => {
    const res = await fetch('/api/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            question,
            answered
        })
    });
    const question = await res.json();
    if (res.ok) {
        dispatch(addQuestion(question));
        return question
    }
};



const initialState = [];

const sortList = (questions) => {

    questions.sort((a, b) => {
      if (a.question_name > b.question_name) {
        return 1;
      }
      if (a.question_nam < b.question_nam) {
        return -1;
      }
      return 0;
    });

    return questions.map(question => question.id);
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
        }
        default:
            return state;
    }
}



export default questionsReducer;
