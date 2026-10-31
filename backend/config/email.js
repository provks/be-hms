const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
//   host: "smtp.example.com",
  service: "Gmail",
//   port: 587,
//   secure: false, // Start unencrypted, upgrade via STARTTLS
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Function to send welcome email with OTP
const sendOTPEmail = async (userEmail, otp) => {
    await transporter.sendMail({
    from: "HMS <varun.sharma@gmail.com>",
    to: userEmail,
    subject: "Welcome to HMS - Your OTP for Admin Login",
    text: `Your OTP for login is: ${otp}. This OTP is valid for 10 minutes. Please use this code to complete your login.`,
  });
}

const sendWelcomeEmail = async (to, subject, text) => {
    console.log(to);
    console.log(subject);
    console.log(text);
    await transporter.sendMail({
        from: "HMS <varun.sharma@gmail.com>",
        to,
        subject,
        text
    });
}

module.exports = {
  sendOTPEmail, sendWelcomeEmail
};