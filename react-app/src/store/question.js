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
    const res = await fetch('/api/restaurants');

    if (res.ok) {
        const questions = await res.json();
        console.log('------------------------------------');
        console.log(questions);
        console.log('------------------------------------');
        dispatch(load(questions.questions));
        return res;
    }
};
