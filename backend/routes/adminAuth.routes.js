const express = require('express');
const router = express.Router();
const {signInAdmin, signUpAdmin, verifyOTP} = require('../controllers/adminAuth.controller');


// Route to create admin
router.post('/signup', signUpAdmin);
// Route to sign in admin
router.post('/signin', signInAdmin);
// verify the OTP
router.post('/', verifyOTP);

module.exports = router;