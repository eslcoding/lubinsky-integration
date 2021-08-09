const router = require('express').Router();
const mondayController = require('./monday.controller');
const authController = require('../auth/auth.controller');


router.post('/auth', authController.authorization);


module.exports = router;