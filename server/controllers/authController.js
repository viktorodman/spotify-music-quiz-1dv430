'use strict'

const authController = {}
const User = require('../models/User')

authController.login = async (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize' + 
        '?response_type=code' + 
        '&client_id=' + process.env.SPOTIFY_CLIENT_ID +
        (process.env.SPOTIFY_SCOPES ? '&scope=' + encodeURIComponent(process.env.SPOTIFY_SCOPES) : '') +
        '&redirect_uri=' + encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI))
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
        res.json(error.message)
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