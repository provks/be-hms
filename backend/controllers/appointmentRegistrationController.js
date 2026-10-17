const AppointmentRegistration = require('../models/appointmentRegistraionModel');

// create a new appointment registration
const createAppointmentRegistration = async (req, res) => {
    try {
        const { name, email, phone, dateOfBirth, address, description, doctorName } = req.body;
        const appointment = new AppointmentRegistration({ name, email, phone, dateOfBirth, address, description, doctorName });
        const savedAppointment = await appointment.save();
        res.status(201).json({ message: "Appointment registration created successfully", data: savedAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment registration', error });
    }
};

// get all appointment registrations
const getAllAppointmentRegistrations = async (req, res) => {
    try {
        const appointments = await AppointmentRegistration.find();
        res.status(200).json({ message: "Appointment registrations fetched successfully", data: appointments });
    } catch(error) {
        res.status(500).json({ message: 'Error fetching appointment registrations', error });
    }
};

// get a single appointment registration by ID
const getAppointmentRegistrationById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await AppointmentRegistration.findById(id); 
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment registration not found' });
        }
        res.status(200).json({ message: "Appointment registration fetched successfully", data: appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointment registration', error });
    }
};

// update an appointment registration by ID
const updateAppointmentRegistrationById = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedAppointment = await AppointmentRegistration.findByIdAndUpdate(id, { status }, { returnDocument: 'after', runValidators: true });
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment registration not found' });
        }
        res.status(200).json({ message: "Appointment registration updated successfully", data: updatedAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment registration', error });
    }
};

// delete an appointment registration by ID
const deleteAppointmentRegistrationById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAppointment = await AppointmentRegistration.findByIdAndDelete(id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment registration not found' });
        }
        res.status(200).json({ message: "Appointment registration deleted successfully", data: deletedAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting appointment registration', error });
    }
};

module.exports = {
    createAppointmentRegistration,
    getAllAppointmentRegistrations,
    getAppointmentRegistrationById,
    updateAppointmentRegistrationById,
    deleteAppointmentRegistrationById
};