'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/highScoreController')

const { authorize } = require('../Utilities/authUtilities')


router.get('/', authorize, controller.getHighScores)
router.post('/add', authorize, controller.addHighScore)



module.exports = router