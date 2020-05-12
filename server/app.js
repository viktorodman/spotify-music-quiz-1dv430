'use strict'


const express = require('express')

const app = express()
const server = require('http').createServer(app)
const session = require('express-session')
const cors = require('cors')
/* const logger = require('morgan') */
const mongoose = require('./configs/mongoose')


const path = require('path');           
const PORT = process.env.PORT || 5000;  
require('dotenv').config()

// CONNECTING TO DATABASE
// ========================
  mongoose.connect().catch(error => {
    console.error(error)
    process.exit(1)
  })
// ========================

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/* app.use(logger('dev')) */

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

app.use('/api/player', require('./routes/playerRouter'))
app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/callback', require('./routes/callbackRouter'))
app.use('/api/quiz', require('./routes/quizRouter'))

// ======================================================//


app.use('*', (req, res) => res.status(404).send('Not found'))

// Error handler.


if (process.env.NODE_ENV === 'production') {           
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..' ,'client', 'build', 'index.html'))
  })
}

server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
    console.log('Press Ctrl-C to terminate...')
})

