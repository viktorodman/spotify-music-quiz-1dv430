import { QUIZ_SELECTED, FETCH_POSSIBLE_QUIZZES, QUIZ_STARTED, SHOW_SCORE, SELECTING_QUIZ, SHOW_HIGH_SCORE } from '../actions/types'

const initialState = {
    quizStatus: 'Showing Score',
    quizIsSelected: null,
    selectedQuiz: null,
    selectedQuizTitle: null,
    possibleQuizzes: null,
    quizStarted: null,
    test: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case SELECTING_QUIZ:
        return {
        ...state, quizStatus: 'Selecting Quiz',
        quizIsSelected: null,
        selectedQuiz: null,
        selectedQuizTitle: null,
        quizStarted: null 
    }
    case QUIZ_SELECTED:
        return { ...state, quizIsSelected: true, selectedQuiz: payload.quizId, selectedQuizTitle:  payload.quizTitle }
    case FETCH_POSSIBLE_QUIZZES:
        return { ...state,  possibleQuizzes: payload}
    case QUIZ_STARTED:
        return { ...state, quizStatus: 'Quiz Started' }
    case SHOW_SCORE:
        return { 
            ...state, 
            quizStatus: 'Showing Score'
        }
    case SHOW_HIGH_SCORE:
        return { 
            ...state, 
            quizStatus: 'Showing HighScore'
        }
    default:
        return state
    }
}
