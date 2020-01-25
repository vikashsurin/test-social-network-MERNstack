const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res
      .status(403)
      .json({ msg: 'Not token, authorization denied maja ala' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // req.user = decoded.user;
    req.admin = decoded.user;
    // console.log('admin', decoded);
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
