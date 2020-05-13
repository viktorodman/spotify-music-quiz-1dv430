import { PLAYER_READY } from './types'


export const setDevice = (id) => async (dispatch) => {
    dispatch({ type: PLAYER_READY, payload: id })
}


export const stopSong = (device_id) => async (dispatch) => {
    let response = await fetch('/api/player/pause', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ device_id }),
        headers: {
            'Content-Type':'application/json'
        }
    })
    response = await response.json()
    console.log(await response)
}

export const playSong = (spotify_uri, device_id) => async (dispatch) => {
    let response = await fetch('/api/player/play', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ spotify_uri, device_id }),
        headers: {
            'Content-Type':'application/json'
        }
    })
    response = await response.json()
    console.log(await response)

    return response
}





