import { QUIZ_SELECTED, FETCH_POSSIBLE_QUIZZES, QUIZ_STARTED, SHOW_SCORE, SELECTING_QUIZ, SHOW_HIGH_SCORE } from './types'



export const selectQuiz = (quizId, quizTitle) => (dispatch) => {
    
    dispatch({ type: QUIZ_SELECTED, payload: {quizId, quizTitle} })
}


export const showScore = () =>  (dispatch) => {
    dispatch( { type: SHOW_SCORE })
}

export const showQuizSelection = () => (dispatch) => {
    dispatch({ type: SELECTING_QUIZ})
}

export const showHighScore = () => (dispatch) => {
    dispatch ({ type: SHOW_HIGH_SCORE})
}

export const getPossibleQuizzes = () => async (dispatch) => {
    let response = await fetch('/api/quiz/getQuizzes', {method: 'GET', credentials: 'include'})
    response = await response.json()

    dispatch({ type: FETCH_POSSIBLE_QUIZZES, payload: response })
}

export const startQuiz = () => (dispatch) => {
    dispatch({ type: QUIZ_STARTED})
}

