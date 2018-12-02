const User = require('../models/user');

exports.signUp = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return res.send({
      error: 'you must provide an email, password, and a username '
        + 'to create and account',
    });
  }

  User.findOne({ email }, (err, existingEser) => {
    if (err) { return next(err); }

    if (existingEser) {
      return res.status(422).send({ error: 'email is already in use' });
    }
    const newUser = new User({ email, password, username });
    newUser.save((saveUserError) => {
      if (saveUserError) { return next(err); }
    });
    res.json({ sucess: true });
  });
  // see if a user exists.
};
