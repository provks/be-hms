const express = require('express');
const Doctor = require('../models/doctorModel');

// create a new doctor
const createDoctor = async (req, res) => {
    try {
        const { name, email, phone, specialization, address, dateOfBirth, availability, degree } = req.body;
        // validation for bad request: check if all required fields are provided
        if (!name || !email || !phone || !specialization || !address || !dateOfBirth || !availability || !degree) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // validation for existing doctor: check if a doctor with the same email already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor with this email already exists' });
        }

        // create a new doctor
        const doctor = await Doctor.create({ name, email, phone, specialization, address, dateOfBirth, availability, degree });
        res.status(201).json({ message: "Doctor created successfully", data: doctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({ message: "Doctors fetched successfully", data: doctors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get a single doctor by ID
const getDoctorById = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ message: "Doctor fetched successfully", data: doctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// update a doctor's data by Id
const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        // const {} = req.body;
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, { returnDocument: 'after', runValidators: true });
        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({message: 'Doctor updated successfully', data: updatedDoctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// delete doctor by ID
const deleteDoctor = async (req, res) => {
    try {
        const {id} = req.params;
        const doctor = await Doctor.findByIdAndDelete(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
};