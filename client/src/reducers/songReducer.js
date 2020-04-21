import { FETCH_SONG} from '../actions/types'

const initialState = {
    songInfo: null
}


export default (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_SONG:
        return { ...state, songInfo: payload }

    default:
        return state
    }
}
