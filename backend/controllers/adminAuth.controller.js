const AdminAuth = require('../models/adminAuth.model');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../config/email');

// Add a new admin
const signUpAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    // validation: check if all required fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // validation: check if password meets minimum length requirement
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    
    try {
        // check if admin already exists
        const existingAdmin = await AdminAuth.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // create a new admin without storing the password
        const admin = new AdminAuth({ name, email });   // creating a new user instance using the User model
        
        const savedAdmin = await admin.save();        // saved to db
        res.status(201).json({message: "Admin created successfully", savedAdmin});
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
}

// Sign in an admin
const signInAdmin = async (req, res) => {
    const {email} = req.body;
    try {
        if (!email ) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // finding the admin in db agains the email
        const admin = await AdminAuth.findOne({ email });
        // handle admin not found
        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // generate OTP and 10 min expiration for email verification
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // Set expiration time to 10 minutes from now

        // store OTP in the database or in-memory store with an expiration time
        admin.otp = otp;
        admin.otpExpiration = otpExpiration;
        await admin.save();

        // Send OTP via email
        await sendOTPEmail(user.email, otp);


        // // generate a JWT token for the authenticated user
        // const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // sending the token back to the client
        res.status(200).json({ message: 'Sent the OTP successfully to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in user', error });
    }
}


// Admin user login
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Check if the email matches the admin email
        const admin = await AdminAuth.findOne({ email });
        if (!admin ) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // validate of otp is correct
        if (otp !== admin.otp || admin.otpExpiration < new Date()) {
             return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // otp is correct so generate token
        const token = jwt.sign({ userId: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // clear admin otp and expiration
        admin.otp = null;
        admin.otpExpiration = null;
        await admin.save();

        res.status(200).json({ message: 'Login success', token });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying with OTP', error });
    }
}

module.exports = {
    signInAdmin,
    signUpAdmin,
    verifyOTP
};