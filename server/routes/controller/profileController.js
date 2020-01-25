const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/pofile/me
//@desc Get current User profile
//@access Private
const currentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.admin.id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

//@route POST api/profile
//@desc Create or Update profile
//@access Private
const createUpdateProfile = async (req, res) => {
  const {
    role,
    course,
    universityName,
    hobbies,
    facebook,
    instagram
  } = req.body;

  //build a profile object
  const profileFields = {};
  profileFields.user = req.admin.id;
  if (role) profileFields.role = role;
  if (course) profileFields.course = course;
  if (universityName) profileFields.universityName = universityName;
  if (hobbies === '') profileFields.hobbies = hobbies;
  if (hobbies)
    profileFields.hobbies = hobbies.split(',').map(hobby => hobby.trim());

  //build social object
  profileFields.social = {};
  if (facebook === '' || facebook) profileFields.social.facebook = facebook;
  if (instagram === '' || instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.admin.id });
    if (profile) {
      //update
      profile = await Profile.findOneAndUpdate(
        { user: req.admin.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    //create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

//@route GET api/profile/user/:user_id
//@desc get profile by user_id
//@access Private
const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

//@route DELETE api/profile
//@desc delete  profile , user & post
//@access Private
const removeUser = async (req, res) => {
  try {
    //Remove posts
    // await Post.deleteMany({ user: req.admin.id });

    //Remove profile
    await Profile.findOneAndRemove({ user: req.admin.id });
    console.log(req.params);
    //Remove user
    await User.findOneAndRemove({ _id: req.admin.id });
    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Server Error');
  }
};

module.exports = {
  currentProfile,
  createUpdateProfile,
  getProfileById,
  removeUser
};
