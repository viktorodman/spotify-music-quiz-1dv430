'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/quizController')

router.get('/createQuiz', controller.createQuiz)
router.get('/getQuizzes', controller.getQuizzes)


module.exports = router