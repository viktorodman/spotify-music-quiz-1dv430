import { IS_LOGGED_IN, LOGOUT_SUCCESS, USER_TOKEN} from '../actions/types'

const initialState = {
    isAuthenticated: null,
    user: null,
    userToken: null
}


export default (state = initialState, { type, payload }) => {
    switch (type) {

    case IS_LOGGED_IN:
        return { ...state, isAuthenticated: payload }

    case LOGOUT_SUCCESS:
        return { ...state, isAuthenticated: false }
    case USER_TOKEN:
        return { ...state, userToken: payload }

    default:
        return state
    }
}
