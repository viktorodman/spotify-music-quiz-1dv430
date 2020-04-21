import { FETCH_SONG } from './types'


export const fetchSongInfo = () => async (dispatch) => {
    let response = await fetch('http://localhost:5000/api/songs', {method: 'GET', credentials: 'include'})
    response = await response.json()
    console.log(await response)
    dispatch({ type: FETCH_SONG, payload: response})
}
