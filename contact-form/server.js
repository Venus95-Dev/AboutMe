// Import required libraries
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors()); 
app.use(bodyParser.json()); 


const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
        user: '',  
        pass: ''          
    }
});


app.post('/contact', (req, res) => {
    const { fullName, email, mobileNumber, subject, message } = req.body;

    // Email content
    const mailOptions = {
        from: email,  // From the user
        to: '',  // To your email address
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
