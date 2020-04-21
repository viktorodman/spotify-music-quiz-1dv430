'use strict'

const songsController = {}

const User = require('../models/User')
const fetch = require('node-fetch')

const songID = '0uV03rQUQn4j6HhWz7Nt2T'

songsController.index = async (req, res) => {
    const { access_token } = await User.findOne({ id: req.session.user })
    
    const song = await getSong(access_token)
    res.json(song)
}


const getAlbumCover = async (access_token) => {

}

const getSong = async (access_token) => {
    const track = await fetch(`https://api.spotify.com/v1/tracks/${songID}`, {
        headers: {
            'Authorization' : `Bearer ${access_token}`
        }
    })

    const song  = await track.json()

    return {
        title: song.name,
        albumCover: song.album.images,
        artists: song.artists.map(artist => {
            return artist.name
        })
    }
}

module.exports = songsController