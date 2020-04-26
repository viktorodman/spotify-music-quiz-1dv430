import { QUIZ_SELECTED, FETCH_POSSIBLE_QUIZZES } from './types'


export const selectQuiz = (selectedQuiz) => async (dispatch) => {
    
    dispatch({ type: QUIZ_SELECTED, payload: selectedQuiz})
}

export const getPossibleQuizzes = () => async (dispatch) => {
    let response = await fetch('http://localhost:5000/api/quiz/getQuizzes', {method: 'GET', credentials: 'include'})
    response = await response.json()

    dispatch({ type: FETCH_POSSIBLE_QUIZZES, payload: response })
}
