const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 8},
  otp: {type: String},
  otpExpiration: {type: Date},
  isEmailVerified: {type: Boolean, default: false},
  // age: {type: Number},
});

// Hook to hash the password before saving the user document
userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);   // To hash the password with 12 rounds of salt
  }
  // call the next middleware in the stack
  // next();
});

// creating a user model from the userSchema
const User = mongoose.model('User', userSchema);

module.exports = User;