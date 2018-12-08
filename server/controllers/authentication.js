const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signUp = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return res.send({
      error: 'you must provide an email, password, and a username '
        + 'to create and account',
    });
  }
  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'email is already in use' });
    }
    const newUser = new User({ email, password, username });
    newUser.save((saveUserError) => {
      if (saveUserError) { return next(err); }
      // respond to request indicating user was created
      res.json({ token: tokenForUser(newUser) });
    });
  });
  // see if a user already exists.
};

exports.signIn = (req, res, next) => {
  // User has already had their password auth'd. Give them a token
  res.send({ token: tokenForUser(req.user) });
};
