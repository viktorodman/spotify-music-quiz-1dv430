import { QUIZ_SELECTED, FETCH_POSSIBLE_QUIZZES, QUIZ_STARTED, FETCH_QUESITONS, NEXT_QUESTION, FETCH_ANSWER, SHOW_SCORE, QUIZ_STATUS, RESET_QUIZ} from '../actions/types'

const initialState = {
    quizStatus: 'Selecting Quiz',
    quizIsSelected: null,
    selectedQuiz: null,
    possibleQuizzes: null,
    quizStarted: null,
    questions: null,
    currentQuestionNumber: 0,
    currentQuestion: null,
    selectedAnswer: null,
    correctAnswer: null,
    score: 0
}


export default (state = initialState, { type, payload }) => {
    switch (type) {

    case QUIZ_SELECTED:
        return { ...state, quizIsSelected: true, selectedQuiz: payload }
    case FETCH_POSSIBLE_QUIZZES:
        return { ...state,  possibleQuizzes: payload}
    case QUIZ_STARTED:
        return { ...state, quizStatus: 'Quiz Started' }
    case QUIZ_STATUS:
        return { ...state, quizStatus: payload}
    case SHOW_SCORE:
        return { 
            ...state, 
            quizStatus: 'Showing Score',
            quizIsSelected: null,
            selectedQuiz: null,
            quizStarted: null,
            questions: null,
            currentQuestion: null,
            selectedAnswer: null,
            correctAnswer: null
        }
    case FETCH_QUESITONS:
        const question = {...payload[0]}
        return { 
            ...state,
            questions: payload, 
            currentQuestionNumber: 0,
            currentQuestion: question,
            currentTrack: question.question_track_url
        }
    case NEXT_QUESTION:
        const cQuestion = {...state.questions[state.currentQuestionNumber + 1]}
        return {
            ...state,
            currentQuestionNumber: state.currentQuestionNumber + 1,
            currentQuestion: cQuestion,
            currentTrack: cQuestion.question_track_url,
            selectedAnswer: null,
            correctAnswer: null
        }
    case FETCH_ANSWER:
        return {
            ...state,
            selectedAnswer: payload.alt_number,
            correctAnswer: payload.question_correct_alt,
            score: state.score += payload.score
        }
    default:
        return state
    }
}
