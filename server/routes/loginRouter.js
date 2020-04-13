'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/loginController')

router.get('/', controller.index)
router.get('/isLoggedIn', controller.isLoggedIn)
router.post('/logout', controller.logout)

module.exports = router