import { IS_LOGGED_IN, LOGOUT_SUCCESS} from '../actions/types'

const initialState = {
    isAuthenticated: null,
    user: null
}


export default (state = initialState, { type, payload }) => {
    switch (type) {

    case IS_LOGGED_IN:
        return { ...state, isAuthenticated: payload }

    case LOGOUT_SUCCESS:
        return { ...state, isAuthenticated: false }

    default:
        return state
    }
}
