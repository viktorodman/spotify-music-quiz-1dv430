import { QUIZ_SELECTED, FETCH_POSSIBLE_QUIZZES, QUIZ_STARTED, FETCH_QUESITONS, NEXT_QUESTION, FETCH_ANSWER, SHOW_SCORE, QUIZ_STATUS } from './types'



export const selectQuiz = (selectedQuiz) => (dispatch) => {
    
    dispatch({ type: QUIZ_SELECTED, payload: selectedQuiz})
}


export const nextQuestion = (prevNumber) => (dispatch, getState) => {

    if (prevNumber + 1 > 7) {
        console.log("wtf")
        dispatch({ type: SHOW_SCORE })
    } else {
        dispatch({ type: NEXT_QUESTION })
    }

    
}

export const showScore = () =>  (dispatch) => {
    return { type: SHOW_SCORE }
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

    dispatch({ type: FETCH_ANSWER, payload: { question_correct_alt, alt_number, score } })
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
