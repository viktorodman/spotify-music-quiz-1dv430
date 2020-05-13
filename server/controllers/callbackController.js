'use strict'

const callbackController = {}

const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const User = require('../models/User')

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:5000/api/callback'

callbackController.index = async (req, res) => {
    const { access_token, refresh_token, expires_in } = await fetchUserCredentials(req.query.code)
    const { display_name, id, images, product } = await getUserInfo(access_token)

    let user = await User.findOne({id})

    if (user) {
        await updateUser(id, access_token, refresh_token)
    } else {
        user = await new User({
            display_name,
            id,
            images: (images[0]) ? images : ['https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'],
            product,
            access_token,
            refresh_token
        })
        await user.save()
    }
    
    req.session.user = user.id
   
    res.redirect('/')
}

const fetchUserCredentials = async (code) => {
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

const updateUser = async (id, access_token, refresh_token)  => {
    const updatedUser = await User.updateOne({ id }, {
        access_token,
        refresh_token 
    })
    if (updatedUser.nModified === 1) {
        console.log('UPDATE SUCCESSFULL')
      } else {
        console.log('UPDATE FAILED')
        }
}

module.exports = callbackController