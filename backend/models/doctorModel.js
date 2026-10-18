const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    specialization: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    availability: { type: String, required: true, enum: ['available', 'unavailable', 'onCall'], default: 'available' },
    degree: { type: String, required: true },
    // age: {type: Number},
}, { timestamps: true });

// creating a doctor model from the doctorSchema
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;