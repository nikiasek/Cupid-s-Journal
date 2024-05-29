const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/cupids_journal_db';
const mongoose = require('mongoose');

if (mongoose.connection.readyState === 0) {
    mongoose.connect(mongoURI)
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.log(err));
  }
  

require('dotenv').config();


app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/protected', require('./routes/protected'));

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



