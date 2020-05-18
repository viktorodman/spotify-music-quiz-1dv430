'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/quizController')

const { authorize } = require('../Utilities/authUtilities')

router.post('/createQuiz', authorize, controller.createQuiz)
router.get('/getQuizzes', authorize, controller.getQuizzes)
router.post('/answer', authorize, controller.checkAnswer)


module.exports = router