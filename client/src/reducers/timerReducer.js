import { START_TIMER, STOP_TIMER, RESET_TIMER, TIME_IS_UP } from '../actions/types'


const initialState = {
    status: null,
    timeIsUp: null,
    timerKey: 0
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case STOP_TIMER:
        return { ...state, status: 'Timer_Stoped' }
    case START_TIMER:
        return { ...state, status: 'Timer_Started' }
    case RESET_TIMER:
        return { ...state, timerKey: state.timerKey + 1 }
    case TIME_IS_UP:
        return { ...state, timeIsUp: true }
    default:
        return state
    }
}
