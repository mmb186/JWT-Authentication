module.exports = (app) => {
  app.get('/', (req, res, next) => {
    res.send({ response: 'none' });
    next();
  });
};
