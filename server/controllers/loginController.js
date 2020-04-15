'use strict'

const loginController = {}

loginController.index = async (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize' + 
        '?response_type=code' + 
        '&client_id=' + process.env.SPOTIFY_CLIENT_ID +
        (process.env.SPOTIFY_SCOPES ? '&scope=' + encodeURIComponent(process.env.SPOTIFY_SCOPES) : '') +
        '&redirect_uri=' + encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI))
}


loginController.isLoggedIn = (req, res) => {
    let status = true
    if (!req.session.user) {
        status = false
    }
    res.json({ loggedIn: status })
}

loginController.logout = (req, res) => {
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


module.exports = loginController