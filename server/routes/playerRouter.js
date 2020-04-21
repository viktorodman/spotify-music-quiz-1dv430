'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/playerController')

router.get('/play', controller.play)


module.exports = router