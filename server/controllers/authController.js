'use strict'

const authController = {}
const User = require('../models/User')

const scopes = "streaming playlist-read-collaborative user-modify-playback-state user-read-private user-read-email playlist-read-private"
let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:5000/api/callback'


authController.login = async (req, res) => {
    try {
        if (req.session.user) {
            throw new Error('Cant login if a user is already logged in')
        }

        res.redirect('https://accounts.spotify.com/authorize' + 
        '?response_type=code' + 
        '&client_id=' + process.env.SPOTIFY_CLIENT_ID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri))
    } catch (error) {
        res.status(403).json({
            status: '403',
            message: error.message
        })
    }
}


authController.isLoggedIn = async (req, res) => {
    let status = true
    if (!req.session.user) {
        status = false
    }
    console.log(req.session.user)
    return res.json({ data: status })
}

authController.logout = (req, res) => {
    try {
        if (!req.session.user) {
            throw new Error('You cant logout when not logged in')
        }
        req.session.destroy()
        res.json('User is now logged out')
    } catch (error) {
        res.json({error: '403', message: error.message})
    }
    
}

authController.getToken = async (req, res) => {
    try {
        const { access_token } = await User.findOne({ id: req.session.user })
        if(!access_token) {
            throw new Error('No acces token found')
        }
        res.json({data: access_token})
    } catch (error) {
        console.log(error)
    }
}


module.exports = authController