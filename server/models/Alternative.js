/* 'use strict'

const mongoose = require('mongoose')

const alternativeSchema = new mongoose.Schema({
  alt_number: { type: Number, required: true },
  alt_img: {type: String, required: true },
  alt_title: {type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
})

const Alternative = mongoose.model('Alternative', alternativeSchema)

module.exports = Alternative

 */