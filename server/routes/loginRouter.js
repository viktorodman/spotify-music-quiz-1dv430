'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/loginController')

router.get('/', controller.index)
router.get('/isLoggedIn', controller.isLoggedIn)

module.exports = router