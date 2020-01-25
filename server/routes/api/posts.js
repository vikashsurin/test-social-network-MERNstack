const express = require('express');
const router = express.Router();
const postsController = require('../controller/postsController');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
//@route /api/posts
router.post('/', [auth, validate.post], postsController.create); //create a post
router.get('/', postsController.getAllPosts); //get all posts
router.get('/:post_id', auth, postsController.getPostById); //get a post by id
router.delete('/:post_id', auth, postsController.deletePost); //get a post by id
router.put('/likes/:post_id', auth, postsController.likePost); //like  a post
// router.put('/unlikes/:post_id', auth, postsController.unlikePost); //unlike  a post
router.post('/comments/:post_id', auth, postsController.addComment); //comment on  a post
router.delete(
  '/comments/:post_id/:comment_id',
  auth,
  postsController.removeComment
); //remove comment from   a post

module.exports = router;
