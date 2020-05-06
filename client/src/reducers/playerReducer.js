import { PLAYER_READY } from '../actions/types'

const initialState = {
    playerReady: null,
    deviceId: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case PLAYER_READY:
        return { ...state, playerReady: true, deviceId: payload }    
    default:
        return state
    }
}
