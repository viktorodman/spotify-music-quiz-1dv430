import { FETCH_QUESITONS, NEXT_QUESTION, FETCH_ANSWER, RESET_QUESTIONS, RESET_SCORE } from './types'


export const nextQuestion = () => (dispatch) => {
    dispatch({ type: NEXT_QUESTION })
}


export const resetQuestions = () => (dispatch) => {
    dispatch({ type: RESET_QUESTIONS })
}

export const resetScore = () => (dispatch) => {
    dispatch({ type:  RESET_SCORE })
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

    const { message, question_correct_alt } = await response.json()

    const score = message === 'Correct' ? 1: 0

    dispatch({ type: FETCH_ANSWER, payload: { question_correct_alt, alt_number, score, message } })
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