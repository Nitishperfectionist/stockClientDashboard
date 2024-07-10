const express = require('express');
const cors = require('cors');

const app = express();

// Allow requests from your frontend URL
app.use(cors({
  origin: 'https://stockclientdashboard-frontend3.onrender.com'
}));

app.use(express.json());

const users = [];

app.post('/login', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }
    users.push(email);
    res.status(200).send('Logged in');
});

module.exports = app;
