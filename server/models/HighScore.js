'use strict'

const mongoose = require('mongoose')

const { HighScoreTheme } = require('./HighScoreTheme')

const highScoreSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  themes: [HighScoreTheme]
}, {
  timestamps: true,
  versionKey: false
})

const HighScore = mongoose.model('HighScore', highScoreSchema)

module.exports = HighScore

