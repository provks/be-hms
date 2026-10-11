const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phone: {type: Number, required: true},
  dateOfBirth: {type: Date, required: true},
  address: {type: String, required: true},
  description: {type: String, required: true},
  doctorName: {type: String, required: true},
  status: {type: String, required: true, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending'},
  // age: {type: Number},
});

// creating a appointment registration model from the appointmentSchema
const AppointmentRegistration = mongoose.model('AppointmentRegistration', appointmentSchema);

module.exports = AppointmentRegistration;