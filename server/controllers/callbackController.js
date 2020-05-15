'use strict'

const callbackController = {}


const { fetchUserCredentials, getUserInfo } = require('../Utilities/spotifyRequests')
const User = require('../models/User')

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:5000/api/callback'
let server_redirect = (process.env.NODE_ENV === 'production') ? '/' : 'http://localhost:3000'
const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'

callbackController.index = async (req, res) => {
    const { access_token, refresh_token, expires_in } = await fetchUserCredentials(req.query.code, redirect_uri)
    const { display_name, id, images, product } = await getUserInfo(access_token)

    let user = await User.findOne({id})

    if (user) {
        await updateUser(id, access_token, refresh_token)
    } else {
        user = await new User({
            display_name,
            id,
            images: (images[0]) ? images : [defaultImage],
            product,
            access_token,
            refresh_token
        })
        await user.save()
    }
    
    req.session.user = user.id 
    
    

    res.redirect(server_redirect)
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