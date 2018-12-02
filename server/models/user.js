const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const modelUtitlies = require('./utilities');

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

// PRE-SAVE HOOK
// On save hook, Bcrypt-password. Ran before a user is saved.
userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(modelUtitlies.saltRounds, (genSaltError, salt) => {
    if (genSaltError) { return next(genSaltError); }
    bcrypt.hash(user.password, salt, null, (hasError, hash) => {
      if (hasError) { return next(hasError); }
      user.password = hash;
      return next();
    });
  });
});

const User = mongoose.model('user', userSchema);

module.exports = User;
