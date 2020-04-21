'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/authController')

router.get('/login', controller.login)
router.get('/isLoggedIn', controller.isLoggedIn)
router.get('/getToken', controller.getToken)
router.post('/logout', controller.logout)

module.exports = router