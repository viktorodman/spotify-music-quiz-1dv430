'use strict'

require('dotenv').config()

const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const session = require('express-session')
 
const mongoose = require('./configs/mongoose')


// CONNECTING TO DATABASE
// ========================
  mongoose.connect().catch(error => {
    console.error(error)
    process.exit(1)
  })
// ========================

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const sessionOptions = {
    name: 'spooootify',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax',
      httpOnly: false
    }
}


app.use(session(sessionOptions))

// =======================================================//
// ROUTES

const socketRoutes = require('./socketRoutes/socketRouter')
app.use('/songs', require('./routes/songsRouter'))
app.use('/login', require('./routes/loginRouter'))
app.use('/callback', require('./routes/callbackRouter'))

// ======================================================//


server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
})

socketRoutes(io)