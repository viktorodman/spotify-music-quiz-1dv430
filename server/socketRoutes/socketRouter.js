'use strict'



module.exports = (io) => {
    let loggedIn = false

    io.on('connection', (socket) => {
        console.log('A user connected!')

        socket.on('change color', (color) => {
            console.log('Color changed to: ', color)
            io.sockets.emit('change color', color)
        })
        socket.on('isUserLoggedIn', () => {
            io.sockets.emit('userLoggedIn', loggedIn)
        })
        socket.on('login', () => {
            loggedIn = true
            io.sockets.emit('userLoggedIn', loggedIn)
        })
    })
}
