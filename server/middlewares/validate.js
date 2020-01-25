const register = async function(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'enter Credentials' });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'enter a valid Email' });
  } else {
    next();
  }
};

const login = async function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'enter login credentials' });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'enter a valid email' });
  } else {
    next();
  }
};

const post = async function(req, res, next) {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: 'Input fields should not be empty' });
  } else {
    next();
  }
};

module.exports = {
  register,
  login,
  post
};
