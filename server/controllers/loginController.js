'use strict'

const loginController = {}

loginController.index = async (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize' + 
        '?response_type=code' + 
        '&client_id=' + process.env.SPOTIFY_CLIENT_ID +
        (process.env.SPOTIFY_SCOPES ? '&scope=' + encodeURIComponent(process.env.SPOTIFY_SCOPES) : '') +
        '&redirect_uri=' + encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI))
}


module.exports = loginController