'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/quizController')

router.post('/createQuiz', controller.authorize, controller.createQuiz)
router.get('/getQuizzes', controller.authorize, controller.getQuizzes)
router.post('/answer', controller.authorize, controller.checkAnswer)


module.exports = router