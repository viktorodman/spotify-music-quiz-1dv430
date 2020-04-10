'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
}, {
  timestamps: true,
  versionKey: false
})

const User = mongoose.model('User', userSchema)

module.exports = User