const passport = require('passport');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signIn);
  app.post('/signup', Authentication.signUp);
};
