const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  // password: {type: String, required: true, minlength: 8},
  // otp: {type: String},
  // otpExpiration: {type: Date},
  // isEmailVerified: {type: Boolean, default: false},
  // // isAdmin: {type: Boolean, default: false},
  age: {type: Number},
});


// creating a user model from the userSchema
const User = mongoose.model('User', userSchema);

module.exports = User;