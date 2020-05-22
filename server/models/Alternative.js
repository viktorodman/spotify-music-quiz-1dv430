'use strict'

const mongoose = require('mongoose')

const Alternative = new mongoose.Schema({
  alt_number: { type: Number, required: true },
  alt_img: {type: String, required: true },
  alt_title: {type: String, required: true },
  id: {type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = { Alternative }

