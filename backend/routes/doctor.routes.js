const express = require('express');
const router = express.Router();
// const doctorController = require('../controllers/doctor.controller');
const { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctor.controller');

// Importing the controller functions for doctor
// create doctor
router.post('/', createDoctor);
// get all doctors
router.get('/', getAllDoctors);
// get doctor by ID
router.get('/:doctorId', getDoctorById);
// update doctor by ID
router.put('/:id', updateDoctor);
// delete doctor by ID
router.delete('/:id', deleteDoctor)


module.exports = router;