const express = require('express');
const router = express.Router();
const userController = require('../controller/usersController');
const validate = require('../../middlewares/validate');

router.post('/', validate.register, userController.create); //register a user

module.exports = router;
