const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle GET login form submission
app.get('/login', (req, res) => {
    const { username, email, password } = req.query;

    console.log('Login attempt:', { username, email, password });

    res.send(`<h2>Welcome, ${username}!</h2><p>Your email: ${email}</p>`);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});