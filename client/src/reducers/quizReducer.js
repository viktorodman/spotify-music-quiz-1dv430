import { QUIZ_SELECTED, FETCH_POSSIBLE_QUIZZES } from '../actions/types'

const initialState = {
    quizIsSelected: null,
    selectedQuiz: null,
    possibleQuizzes: null
}


export default (state = initialState, { type, payload }) => {
    switch (type) {

    case QUIZ_SELECTED:
        return { ...state, quizIsSelected: true, selectedQuiz: payload }
    case FETCH_POSSIBLE_QUIZZES:
        return { ...state,  possibleQuizzes: payload}

    default:
        return state
    }
}
