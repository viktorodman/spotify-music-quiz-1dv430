'use strict'

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  display_name: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  images: {type: Array, required: true, unique: true},
  product: {type: String, required: true, unique: true},
  access_token: {type: String, required: true, unique: true},
  refresh_token: {type: String, required: true, unique: true}
}, {
  timestamps: true,
  versionKey: false
})

const User = mongoose.model('User', userSchema)

module.exports = User

