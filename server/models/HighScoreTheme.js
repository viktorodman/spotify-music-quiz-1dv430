'use strict'

const mongoose = require('mongoose')

const { Score } = require('./Score')

const HighScoreTheme = new mongoose.Schema({
    quizName: { type: String, required: true},
    topFiveScores: [Score]
}, {
  timestamps: true,
  versionKey: false
})


module.exports = { HighScoreTheme }