import { QUIZ_SELECTED, FETCH_POSSIBLE_QUIZZES, QUIZ_STARTED, SHOW_SCORE } from '../actions/types'

const initialState = {
    quizStatus: 'Selecting Quiz',
    quizIsSelected: null,
    selectedQuiz: null,
    possibleQuizzes: null,
    quizStarted: null,
    test: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case QUIZ_SELECTED:
        return { ...state, quizIsSelected: true, selectedQuiz: payload }
    case FETCH_POSSIBLE_QUIZZES:
        return { ...state,  possibleQuizzes: payload}
    case QUIZ_STARTED:
        return { ...state, quizStatus: 'Quiz Started' }
    case SHOW_SCORE:
        return { 
            ...state, 
            quizStatus: 'Showing Score',
            quizIsSelected: null,
            selectedQuiz: null,
            quizStarted: null
        }
    case 'TEST':
        return {
            ...state,
            test: true
        }
    default:
        return state
    }
}
