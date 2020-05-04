import { QUIZ_SELECTED, FETCH_POSSIBLE_QUIZZES, QUIZ_STARTED, FETCH_QUESITONS, NEXT_QUESTION, CHANGING_QUESTION } from '../actions/types'

const initialState = {
    quizIsSelected: null,
    selectedQuiz: null,
    possibleQuizzes: null,
    quizStarted: null,
    questions: null,
    currentQuestionNumber: null,
    currentQuestion: null,
    prevQuestion: null
}


export default (state = initialState, { type, payload }) => {
    switch (type) {

    case QUIZ_SELECTED:
        return { ...state, quizIsSelected: true, selectedQuiz: payload }
    case FETCH_POSSIBLE_QUIZZES:
        return { ...state,  possibleQuizzes: payload}
    case QUIZ_STARTED:
        return { ...state, quizStarted: true, }
    case FETCH_QUESITONS:
        return { 
            ...state,
            questions: payload, 
            currentQuestionNumber: 0,
            currentQuestion: payload[0]
        }
    case CHANGING_QUESTION:
        return { ...state, currentQuestion: null }
    case NEXT_QUESTION:
        
        return {
            ...state,
            currentQuestionNumber: state.currentQuestionNumber + 1,
            currentQuestion: state.questions[state.currentQuestionNumber + 1],
            prevQuestion: state.currentQuestion
        }
    default:
        return state
    }
}
