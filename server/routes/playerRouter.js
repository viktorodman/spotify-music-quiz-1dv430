'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/playerController')

router.post('/play', controller.play)
router.post('/pause', controller.pause)


module.exports = router