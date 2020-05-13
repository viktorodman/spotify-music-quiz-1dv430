import { IS_LOGGED_IN, LOGOUT_SUCCESS, USER_TOKEN } from './types'


export const isLoggedIn = () => async (dispatch) => {
    let response = await fetch('/api/auth/isLoggedIn', {method: 'GET', credentials: 'include'})
    response = await response.json()
    dispatch({ type: IS_LOGGED_IN, payload: response.data})
}

export const logout = () => async (dispatch) => {
    let response = await fetch('/api/auth/logout', {method: 'POST', credentials: 'include'})
    response = await response.json()
    dispatch({ type: LOGOUT_SUCCESS, payload: response.data})
}

export const getToken = () => async (dispatch) => {
    let response = await fetch('/api/auth/getToken', {method: 'GET', credentials: 'include'})
    response = await response.json()
    return response.data
}