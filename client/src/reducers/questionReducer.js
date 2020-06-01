import { FETCH_ANSWER, NEXT_QUESTION, FETCH_QUESITONS, RESET_QUESTIONS, RESET_SCORE } from '../actions/types'

const initialState = {
    questionsReady: null,
    questions: null,
    currentQuestionIndex: null,
    selectedAnswer: null,
    correctAnswer: null,
    answerMessage: null,
    score: 0
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_ANSWER:
        return {
            ...state,
            selectedAnswer: payload.alt_number,
            correctAnswer: payload.question_correct_alt,
            score: state.score += payload.score,
            answerMessage: payload.message
        }
    case NEXT_QUESTION:
        return {
            ...state,
            currentQuestionIndex: state.currentQuestionIndex + 1,
            selectedAnswer: null,
            correctAnswer: null,
            answerMessage: null
        }
    case FETCH_QUESITONS:
    return { 
        ...state,
        questions: payload,
        currentQuestionIndex: 0,
        score: 0,
        questionsReady: true
    }
    case RESET_QUESTIONS:
    return { 
        ...state,
        questionsReady: null,
        questions: null,
        currentQuestionIndex: null,
        selectedAnswer: null,
        correctAnswer: null,
        answerMessage: null
    }
    case RESET_SCORE:
    return { 
        ...state,
        score: 0
    }
    default:
        return state
    }
}
