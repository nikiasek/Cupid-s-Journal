const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/api/documents', (req, res) => {
    // Logic to fetch documents from the database
    res.json({ documents: [] });
});

app.post('/api/documents', (req, res) => {
    // Logic to create a new document
    res.json({ success: true });
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });