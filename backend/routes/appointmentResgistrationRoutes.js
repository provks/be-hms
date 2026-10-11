const express = require('express');
const router = express.Router();
const {
    createAppointmentRegistration, 
    getAllAppointmentRegistrations, 
    getAppointmentRegistrationById, 
    updateAppointmentRegistrationById,
    deleteAppointmentRegistrationById
} = require('../controllers/appointmentRegistrationController');

// Define routes for appointment registration-related operations

// Route to create a new appointment registration
router.post('/', createAppointmentRegistration);
// Route to get all appointment registrations
router.get('/', getAllAppointmentRegistrations);
// Route to get an appointment registration by ID
router.get('/:id', getAppointmentRegistrationById);
// Route to update an appointment registration by ID
router.put('/:id', updateAppointmentRegistrationById);
// Route to delete an appointment registration by ID
router.delete('/:id', deleteAppointmentRegistrationById);

module.exports = router;
