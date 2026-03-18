const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route: Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Route: Fetch URL content
app.post('/browse', async (req, res) => {
    let url = req.body.url;

    // Add http if missing
    if (!url.startsWith('http')) {
        url = 'http://' + url;
    }

    try {
        const response = await axios.get(url);

        res.send(`
            <h2>Viewing: ${url}</h2>
            <a href="/">⬅ Back</a>
            <hr>
            ${response.data}
        `);

    } catch (error) {
        res.send(`
            <h2 style="color:red;">❌ Invalid URL or Unable to Fetch Content</h2>
            <a href="/">⬅ Go Back</a>
        `);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});