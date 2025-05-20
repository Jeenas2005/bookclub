const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.static(__dirname)); // Serve index.html from current dir

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index3.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});