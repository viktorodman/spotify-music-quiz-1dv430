'use strict'



module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected!')

        socket.on('change color', (color) => {
            console.log('Color changed to: ', color)
            io.sockets.emit('change color', color)
        })
    })
}
