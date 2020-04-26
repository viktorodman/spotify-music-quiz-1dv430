import { PLAYER_READY } from './types'


export const setDevice = (id) => async (dispatch) => {
    dispatch({ type: PLAYER_READY, payload: id })
}

export const playSong = (id) => async (dispatch) => {
    let response = await fetch('http://localhost:5000/api/player/play', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({data: id}),
        headers: {
            'Content-Type':'application/json'
        }
    })
    response = await response.json()
    console.log(await response)
}





