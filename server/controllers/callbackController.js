'use strict'

const callbackController = {}

const fetch = require('node-fetch')
const { URLSearchParams } = require('url')

callbackController.index = async (req, res) => {
    /* console.log(req.query.code) */
    /* console.log(req) */
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', req.query.code)
    params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI)

    const respone = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: params,
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer(
                process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'))
        }
    })

    console.log(await respone.json())
}

module.exports = callbackController