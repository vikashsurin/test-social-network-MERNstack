const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

router.get('/', auth, authController.test); //test authenticated user
router.post('/', validate.login, authController.authenticate); //authenticate a user

module.exports = router;
