const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const config = require('../config');

const localOptions = { usernameField: 'email' };
const LocalLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    user.comparePassword(password, (passwordCompareError, isMatch) => {
      if (passwordCompareError) { return done(passwordCompareError); }
      if (!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});


// setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// payload is decrypted jwt-token
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(LocalLogin);
