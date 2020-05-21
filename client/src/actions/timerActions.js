import { START_TIMER, STOP_TIMER, RESET_TIMER, TIME_IS_UP } from './types'


export const startTimer = () => (dispatch, getState) => {
    dispatch({ type: START_TIMER})
}

export const stopTimer = () => (dispatch) => {
    dispatch({ type: STOP_TIMER })
}

export const resetTimer = () => (dispatch) => {
    dispatch({ type: RESET_TIMER })
}

export const timesUp = () => (dispatch) => {
    dispatch({ type: TIME_IS_UP })
}

