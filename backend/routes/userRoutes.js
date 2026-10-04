const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

// Define routes for user-related operations
// Route to get all users
router.get('/', userController.getAllUsers);

// Route to add a new user
router.post('/', userController.addUser);

module.exports = router;
