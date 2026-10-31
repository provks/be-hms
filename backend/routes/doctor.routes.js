const express = require('express');
const router = express.Router();
// const doctorController = require('../controllers/doctor.controller');
const {isAdmin} = require('../middleware/authMiddleware');
const { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctor.controller');

// Importing the controller functions for doctor
// create doctor
router.post('/', isAdmin, createDoctor);
// get all doctors
router.get('/', isAdmin, getAllDoctors);
// get doctor by ID
router.get('/:doctorId', isAdmin, getDoctorById);
// update doctor by ID
router.put('/:id', isAdmin, updateDoctor);
// delete doctor by ID
router.delete('/:id', isAdmin, deleteDoctor)


module.exports = router;