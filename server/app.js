'use strict'

const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const socketRoutes = require('./socketRoutes/socketRouter')


server.listen(4000, () => {
    console.log('Server running at http://localhost:8000')
    console.log('Press Ctrl-C to terminate...')
})

socketRoutes(io)