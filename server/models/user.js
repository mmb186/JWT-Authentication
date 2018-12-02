const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define Model
const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
});

const User = mongoose.mode('user', userSchema);

module.exports = User;
