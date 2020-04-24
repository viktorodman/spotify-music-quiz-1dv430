'use strict'

const mongoose = require('mongoose')

/* const Question = require('./Question') */

const Alternative = new mongoose.Schema({
  alt_number: { type: Number, required: true },
  alt_img: {type: String, required: true },
  alt_title: {type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
})

const Question = new mongoose.Schema({
  question_img: { type: String, required: true },
  question_number: { type: Number, required: true },
  question_title: { type: String, required: true },
  question_track_url: { type: String, required: true },
  question_correct_alt: { type: Number, required: true },
  question_alternatives: [Alternative]
}, {
  timestamps: true, 
  versionKey: false
})

const userSchema = new mongoose.Schema({
  display_name: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  images: {type: Array, required: true, unique: true},
  product: {type: String, required: true, unique: true},
  access_token: {type: String, required: true, unique: true}, 
  refresh_token: {type: String, required: true, unique: true},
  user_questions: [Question]
}, {
  timestamps: true,
  versionKey: false
})

const User = mongoose.model('User', userSchema)

module.exports = User

