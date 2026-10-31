const express = require('express');
const router = express.Router();
const {signIn, signUp } = require('../controllers/auth.controller');

// Route to add a new user
router.post('/signup', signUp);
// Route to sign in a user
router.post('/signin', signIn);

module.exports = router;
