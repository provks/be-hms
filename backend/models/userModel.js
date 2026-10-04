const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, required: true},
});

// creating a user model from the userSchema
const User = mongoose.model('User', userSchema);

module.exports = User;