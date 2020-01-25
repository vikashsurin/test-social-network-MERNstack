const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const profileController = require('../controller/profileController');

//@route api/profiles
router.get('/me', auth, profileController.currentProfile); //logged user profile
router.post('/', auth, profileController.createUpdateProfile); //creates prfoile
router.put('/', auth, profileController.createUpdateProfile); //updates profile
router.get('/user/:user_id', auth, profileController.getProfileById); //find user by id
router.delete('/', auth, profileController.removeUser); //deletes user,profile,posts

module.exports = router;
