'use strict'

const songsController = {}

songsController.index = async (req, res) => {
    console.log(req.session)
    res.json([
        {id: 1, title: 'Song 1'},
        {id: 2, title: 'Song 2'}
    ])
}

module.exports = songsController