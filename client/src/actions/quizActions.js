import { QUIZ_SELECTED, FETCH_POSSIBLE_QUIZZES, QUIZ_STARTED, FETCH_QUESITONS, NEXT_QUESTION, SEND_ANSWER } from './types'


export const selectQuiz = (selectedQuiz) => (dispatch) => {
    
    dispatch({ type: QUIZ_SELECTED, payload: selectedQuiz})
}


export const nextQuestion = () => async (dispatch) => {
    dispatch({ type: NEXT_QUESTION })
}

export const sendAnswer = (question_number, alt_number) => async (dispatch) => {
    let response = await fetch('http://localhost:5000/api/quiz/answer', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({question_number, alt_number}),
        headers: {
            'Content-Type':'application/json'
        }
    })

    console.log(await response.json())
}

export const getPossibleQuizzes = () => async (dispatch) => {
    let response = await fetch('http://localhost:5000/api/quiz/getQuizzes', {method: 'GET', credentials: 'include'})
    response = await response.json()

    dispatch({ type: FETCH_POSSIBLE_QUIZZES, payload: response })
}

export const startQuiz = () => (dispatch) => {
    dispatch({ type: QUIZ_STARTED})
}

export const getQuestions = (id) => async (dispatch) => {
    let response = await fetch('http://localhost:5000/api/quiz/createQuiz', {
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
