const User = require('../../models/User');
const Post = require('../../models/Post');
//@route POST api/posts
//@desc create a Post
//@access Private
const create = async (req, res) => {
  try {
    const user = await User.findById(req.admin.id).select('-password');

    const newPost = new Post({
      title: req.body.title,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.admin.id
    });

    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

//@route GET /api/posts
//@desc get all the posts
//@access Private
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
//@route GET /api/posts/:post_id
//@desc get a post by id
//@access Private
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

//@route DELETE /api/posts/:post_id
//@desc deletes a post by id
//@access Private
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    //check user
    if (post.user.toString() !== req.admin.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

//@route PUT api/posts/likes/:like_id
//@desc like a post
//@access Private
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    //check if the post is already been liked by the user
    if (
      post.likes.filter(like => like.user.toString() === req.admin.id).length >
      0
    ) {
      //remove like
      //Get remove index
      const removeIndex = await post.likes
        .map(like => like.user.toString())
        .indexOf(req.admin.id);

      post.likes.splice(removeIndex, 1);
      await post.save();

      return res.json(post.likes);
    }

    post.likes.unshift({ user: req.admin.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

//@route PUT api/posts/dislikes/:dislike_id
//@desc dislike a post
//@access Private
// const unlikePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.post_id);
//     //check if the post is already been disliked
//     if (
//       post.likes.filter(like => like.user.toString() === req.admin.id)
//         .length === 0
//     ) {
//       return res.status(400).json({ msg: 'Post has not yet been liked' });
//     }

//     //Get remove index
//     const removeIndex = await post.likes
//       .map(like => like.user.toString())
//       .indexOf(req.admin.id);

//     post.likes.splice(removeIndex, 1);
//     await post.save();

//     res.json(post.likes);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// };

//@route POST api/posts/comment/:post_id
//@desc comment on a post
//@access Private
const addComment = async (req, res) => {
  try {
    const user = await User.findById(req.admin.id).select('-password');
    const post = await Post.findById(req.params.post_id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.admin.id
    };

    post.comments.push(newComment);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

//@route DELETE api/posts/comment/:post_id/:comment_id
//@desc remove a comment
//@access Private
const removeComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    //make sure comment exists
    if (!comment) {
      res.status(404).json({ error: 'Comment does not exist' });
    }

    //check admin
    if (comment.user.toString() !== req.admin.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    //Get remove index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.admin.id);

    post.comments.splice(removeIndex, 1);
    await post.save();
       
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  create,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  // unlikePost,
  addComment,
  removeComment
};
