const { URLSearchParams } = require('url')
const fetch = require('node-fetch')

const fetchUserCredentials = async (code, redirect_uri)  => {
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', redirect_uri)

    let response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: params,
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer(
                process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'))
        }
    })


    return response.json()
}


const getUserInfo = async (accessToken) => {
    let response = await fetch('https://api.spotify.com/v1/me', {
       headers: {
           'Authorization': `Bearer ${accessToken}`
       }
   })
   
   
   return response.json()
}

const getUserTracks = async (access_token, id) => {
    const playlists = await getUserPlaylists(access_token, id)
    const tracks = await Promise.all(playlists.map(async (playlist) => await getTracksFromPlaylist(access_token, playlist.id)))
    
    return tracks
}

const getUserPlaylists = async (access_token, user_id) => {
    const response  = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists?limit=10`, {
        headers: {
            'Authorization' : `Bearer ${access_token}`
        }
    })

    const { items } = await response.json()

    const playlists = await items.filter(item => item.tracks.total > 3)
                       .map(list =>  ({
                           id: list.id,
                           length: list.tracks.total
                        }))         
                 

    return playlists
}

const getTracksFromPlaylist = async (access_token, playlist_id) => {
    let response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        headers: {
            'Authorization' : `Bearer ${access_token}`
        }
    })

    const data = await response.json()
    const tracks = await data.items.map(track => track.track)

    return tracks
}

const getArtistImage = async (url, access_token) => {
    const response  = await fetch(url, {
        headers: {
            'Authorization' : `Bearer ${access_token}`
        }
    })

    const { images } = await response.json()

    return (typeof images[0] === 'undefined') ? 'https://via.placeholder.com/350x150': images[0].url
}

module.exports = { fetchUserCredentials, getUserInfo, getUserTracks, getTracksFromPlaylist, getArtistImage }