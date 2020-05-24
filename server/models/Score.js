'use strict'

const mongoose = require('mongoose')


const Score = new mongoose.Schema({
    numberOfQuestions: { type: Number, required: true },
    numberOfCorrectAnswers: { type: Number, required: true }
}, {
  timestamps: true,
  versionKey: false
})


module.exports = { Score }