import { QUIZ_SELECTED, FETCH_POSSIBLE_QUIZZES, QUIZ_STARTED, FETCH_QUESITONS, NEXT_QUESTION, FETCH_ANSWER, SHOW_SCORE } from './types'


export const selectQuiz = (selectedQuiz) => (dispatch) => {
    
    dispatch({ type: QUIZ_SELECTED, payload: selectedQuiz})
}


export const nextQuestion = () => async (dispatch) => {
    dispatch({ type: NEXT_QUESTION })
}

export const showScore = () => async (dispatch) => {
    dispatch({ type: SHOW_SCORE })
}

export const sendAnswer = (question_number, alt_number) => async (dispatch) => {
    const response = await fetch('/api/quiz/answer', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({question_number, alt_number}),
        headers: {
            'Content-Type':'application/json'
        }
    })

    const correct_alt_number = await response.json()

    dispatch({ type: FETCH_ANSWER, payload: {alt_number, correct_alt_number} })
}

export const getPossibleQuizzes = () => async (dispatch) => {
    let response = await fetch('/api/quiz/getQuizzes', {method: 'GET', credentials: 'include'})
    response = await response.json()

    dispatch({ type: FETCH_POSSIBLE_QUIZZES, payload: response })
}

export const startQuiz = () => (dispatch) => {
    dispatch({ type: QUIZ_STARTED})
}

export const getQuestions = (id) => async (dispatch) => {
    let response = await fetch('/api/quiz/createQuiz', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({playlist_id: id}),
        headers: {
            'Content-Type':'application/json'
        }
    })
    response = await response.json()
    dispatch({ type: FETCH_QUESITONS, payload: response })

    return response
}
