'use strict'

const mongoose = require('mongoose')
const { Alternative } = require('./Alternative')

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

module.exports = { Question }



