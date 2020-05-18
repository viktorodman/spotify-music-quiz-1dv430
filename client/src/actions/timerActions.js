import { TIMER_STATUS, DECREMENT_TIMER } from './types'

export const setTimerStatus = (status) => async (dispatch) => {
    dispatch({ type: TIMER_STATUS, payload: status})
}

export const startTimer = () => (dispatch, getState) => {
    let timer = null
    clearInterval(timer)
    timer = setInterval(() => {
        dispatch(tick())
        const { currentTime } = getState()
        if (currentTime <= 1) {
            clearInterval(timer)
        }
    }, 1000 / 20)
}

const tick = () => ({type: DECREMENT_TIMER})
