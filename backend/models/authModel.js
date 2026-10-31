const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 8},
});

// Hook to hash the password before saving the user document
authSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);   // To hash the password with 12 rounds of salt
  }
});

// creating a user model from the userSchema
const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;