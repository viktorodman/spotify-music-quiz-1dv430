import { PLAYER_READY, SONG_CHANGING, PLAYING_SONG, SET_CURRENT_SONG, STOPPING_SONG } from './types'


export const setDevice = (id) => async (dispatch) => {
    dispatch({ type: PLAYER_READY, payload: id })
}

export const changingSong = () => async (dispatch) => {
    dispatch({ type: SONG_CHANGING })
}

export const setCurrentSong = (url) => async (dispatch) => {
    dispatch( {type: SET_CURRENT_SONG, payload: url} )
}

export const stopSong = (device_id) => async (dispatch) => {
    let response = await fetch('http://localhost:5000/api/player/pause', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ device_id }),
        headers: {
            'Content-Type':'application/json'
        }
    })
    response = await response.json()
    console.log(await response)
    dispatch({ type: STOPPING_SONG })
}

export const playSong = (spotify_uri, device_id) => async (dispatch) => {
    let response = await fetch('http://localhost:5000/api/player/play', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ spotify_uri, device_id }),
        headers: {
            'Content-Type':'application/json'
        }
    })
    response = await response.json()
    console.log(await response)
    dispatch({ type: PLAYING_SONG })

    return response
}





