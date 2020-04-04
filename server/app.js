'use strict'

const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)


server.listen(8000, () => {
    console.log('Server running at http://localhost:8000')
    console.log('Press Ctrl-C to terminate...')
})