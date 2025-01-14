// Import required libraries
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON requests

// Configure Nodemailer for email sending
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use your email service (Gmail is used here)
    auth: {
        user: 'venussafari93@gmail.com',  // Your email address
        pass: 'xavi wdap hujq bbua'          // Your email password (consider using environment variables for security)
    }
});

// Define the POST route for sending the email
app.post('/contact', (req, res) => {
    const { fullName, email, mobileNumber, subject, message } = req.body;

    // Email content
    const mailOptions = {
        from: email,  // From the user
        to: 'venussafari93@gmail.com',  // To your email address
        subject: subject,
        text: `Message from ${fullName} (${mobileNumber})\n\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Failed to send email.' });
        }
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ success: true, message: 'Email sent successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
