const mongoose = require('mongoose');

const adminAuthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpiration: { type: Date },
}, {timestamps: true});

// creating a user model from the userSchema
const AdminAuth = mongoose.model('AdminAuth', adminAuthSchema);

module.exports = AdminAuth;