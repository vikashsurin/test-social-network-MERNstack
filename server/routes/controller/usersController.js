const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

//@route POST /api/users
//desc Register a user
//@access Public
module.exports = {
  create: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      //check user is unique
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      console.log(avatar);
      //create user instance
      user = new User({
        name,
        email,
        avatar,
        password
      });

      //password encrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //save user
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      //jwt
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(5000).send('Sever Error');
    }
  }
};
