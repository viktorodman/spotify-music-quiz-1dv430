'use strict'

const mongoose = require('mongoose')

const { Question } = require('./Question')

const userSchema = new mongoose.Schema({
  display_name: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  images: {type: Array, required: true},
  product: {type: String, required: true},
  access_token: {type: String, required: true, unique: true}, 
  refresh_token: {type: String, required: true, unique: true},
  user_questions: [Question]
}, {
  timestamps: true,
  versionKey: false
})

const User = mongoose.model('User', userSchema)

module.exports = User

