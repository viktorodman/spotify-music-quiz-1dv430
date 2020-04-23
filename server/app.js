'use strict'

require('dotenv').config()

const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const session = require('express-session')
const cors = require('cors')
const logger = require('morgan')
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

app.use(logger('dev'))

const sessionOptions = {
    name: 'spooootify',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax',
      httpOnly: true
    }
}


app.use(session(sessionOptions))


const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions));



// =======================================================//
// ROUTES

app.get('/', (req, res) => res.send('TEEEEEST'))

const socketRoutes = require('./socketRoutes/socketRouter')
app.use('/api/player', require('./routes/playerRouter'))
app.use('/api/songs', require('./routes/songsRouter'))
app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/callback', require('./routes/callbackRouter'))
app.use('/api/quiz', require('./routes/quizRouter'))

// ======================================================//


server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
})

socketRoutes(io)