'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/quizController')

router.get('/createQuiz', controller.createQuiz)


module.exports = router