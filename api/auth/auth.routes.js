const express = require('express')
const {login, signup, logout, getLoggedInUser, authorization, callback} = require('./auth.controller')

const router = express.Router()

// router.post('/login', login)
// router.post('/signup', signup)
// router.post('/logout', logout)
// router.get('/user', getLoggedInUser) // protect ?
router.get('/authorization/:userEmail', authorization) // openDialog ==>  
router.get('/oauth/callback', callback)


module.exports = router