import { TIMER_STATUS, DECREMENT_TIMER } from '../actions/types'


const initialState = {
    status: null,
    startTime: 15,
    currentTime: 15,
    
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case TIMER_STATUS:
        return { ...state, status: payload }
    case DECREMENT_TIMER:
        const time = state.currentTime - (1 / 20)
        return { ...state, currentTime: time }
    default:
        return state
    }
}
