'use strict'

const callbackController = {}

const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const User = require('../models/User')

callbackController.index = async (req, res) => {
    const { access_token, refresh_token, expires_in } = await fetchUserCredentials(req.query.code)
    const { display_name, id, images, product } = await getUserInfo(access_token)

    let user = await User.findOne({id})

    if (user) {
        await updateUser(id, access_token, refresh_token)
    } else {
        user = new User({
            display_name,
            id,
            images,
            product,
            access_token,
            refresh_token
        })
        await user.save()
    }

    

    
    

    
    req.session.user = user.id
    res.redirect('http://localhost:3000')
}

// display_name, id, images, product, access_token, refresh_token

const fetchUserCredentials = async (code) => {
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI)

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
     const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    
    return response.json()
}

const updateUser = async (id, access_token, refresh_token)  => {
    const updatedUser = await User.updateOne({ id }, {
        access_token,
        refresh_token
    })
}

module.exports = callbackController