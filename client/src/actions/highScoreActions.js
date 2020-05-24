import { FETCH_HIGH_SCORES, SELECT_HIGH_SCORE } from './types'


export const getHighScores = () => async (dispatch) => {
    let response = await fetch('/api/highscore', {method: 'GET', credentials: 'include'})
    response = await response.json()

    dispatch({ type: FETCH_HIGH_SCORES, payload: response })
}

export const addScore = (theme_id, numberOfCorrectAnswers, numberOfQuestions) => async (dispatch) => {
    let response = await fetch('/api/highscore/add', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({theme_id, numberOfCorrectAnswers, numberOfQuestions}),
        headers: {
            'Content-Type':'application/json'
        }
    })
}


export const selectHighScoreTheme = (selectedHighScore) => (dispatch) => {
    
    dispatch({ type: SELECT_HIGH_SCORE, payload: selectedHighScore})
}