import { QUIZ_SELECTED, FETCH_POSSIBLE_QUIZZES, QUIZ_STARTED, SHOW_SCORE } from './types'



export const selectQuiz = (selectedQuiz) => (dispatch) => {
    
    dispatch({ type: QUIZ_SELECTED, payload: selectedQuiz})
}


export const showScore = () =>  (dispatch) => {
    return { type: SHOW_SCORE }
}



export const getPossibleQuizzes = () => async (dispatch) => {
    let response = await fetch('/api/quiz/getQuizzes', {method: 'GET', credentials: 'include'})
    response = await response.json()

    dispatch({ type: FETCH_POSSIBLE_QUIZZES, payload: response })
}

export const startQuiz = () => (dispatch) => {
    dispatch({ type: QUIZ_STARTED})
}


export const testFunction = () => (dispatch) => {
    dispatch({ type: 'TEST' })
}