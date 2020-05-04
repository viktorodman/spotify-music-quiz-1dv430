import { PLAYER_READY, SONG_CHANGING, SET_CURRENT_SONG, PLAYING_SONG, STOPPING_SONG } from '../actions/types'

const initialState = {
    playerReady: null,
    deviceId: null,
    currentSong: null,
    playerStatus: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case PLAYER_READY:
        return { ...state, playerReady: true, deviceId: payload }
    case SONG_CHANGING:
        return { ...state, playerReady: false }    
    case PLAYING_SONG:
        return { ...state, playerReady: 'Playing' }    
    case STOPPING_SONG:
        return { ...state, playerStatus: 'Stopping' }    
    case SET_CURRENT_SONG:
        return { ...state, currentSong: payload }    
    default:
        return state
    }
}
