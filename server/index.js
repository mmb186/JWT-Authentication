// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');


// DB setup
mongoose.connect('mongodb://localhost/dev_video_sync_player',
  { useNewUrlParser: true },
  (err) => {
    if (err) throw err;
  }).then(() => {
  logger('mongoose Ready state: ', mongoose.connection.readyState);
})



// APP Setup
const app = express();
app.use(logger('combine')); // Morgan is loggin framework
app.use(bodyParser.json({ type: '*/*' }));
router(app);


// Server Setup
const PORT = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Server Started on port: ', PORT);
});
