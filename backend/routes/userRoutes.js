const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

// Define routes for user-related operations
// Route to get all users
router.get('/', userController.getAllUsers);

// Route to add a new user
router.post('/signup', userController.signUpUser);
// Route to sign in a user
router.post('/signin', userController.signInUser);

module.exports = router;
