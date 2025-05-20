const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS) from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST /signup form submission
app.post('/signup', (req, res) => {
    const { UserName, email, phone, password, confirmPassword } = req.body;

    // Log the received values
    console.log('Signup attempt:', { UserName, email, phone, password, confirmPassword });

    // Respond with a success or error message
    if (password === confirmPassword) {
        res.send(`
            <html>
                <head>
                    <title>Signup Successful</title>
                </head>
                <body>
                    <h2>Signup Successful!</h2>
                    <p>Welcome, ${UserName}!</p>
                    <p>Your email: ${email}</p>
                    <p>Your phone: ${phone}</p>
                    <a href="/">Go back to Signup Page</a>
                </body>
            </html>
        `);
        //how to get get the values in javascript
        //code

    } else {
        res.send(`
            <html>
                <head>g
                    <title>Signup Failed</title>
                </head>
                <body>
                    <h2>Signup Failed!</h2>
                    <p>Passwords do not match. Please try again.</p>
                    <a href="/">Go back to Signup Page</a>
                </body>
            </html>
        `);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});