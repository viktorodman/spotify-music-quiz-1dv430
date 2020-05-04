'use strict'

const playerController = {}

const fetch = require('node-fetch')
const User = require('../models/User')

const spotify_uri = 'spotify:track:0jP41H2AdT6m9QxoGgoasW'

playerController.play = async (req, res) => {
    const { spotify_uri, device_id } = req.body
    const { access_token } = await User.findOne({ id: req.session.user })
    

    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        } 
    })

    console.log(req.body.data) 
    res.json('play')
}
playerController.pause = async (req, res) => {
    const { access_token } = await User.findOne({ id: req.session.user })
    const { device_id } = req.body

    await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${device_id}`, {
        method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    })

    console.log(req.body.data)
    res.json('pause')
}






module.exports = playerController