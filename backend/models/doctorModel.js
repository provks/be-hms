const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    specialization: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    availability: { type: String, required: true, enum: ['full-time', 'part-time', 'on-call'], default: 'full-time' },
    degree: { type: String, required: true },
    // age: {type: Number},
}, { timestamps: true });

// creating a doctor model from the doctorSchema
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;