import { PLAYER_READY } from './types'


export const setDevice = (id) => async (dispatch) => {
    dispatch({ type: PLAYER_READY, payload: id })
}




