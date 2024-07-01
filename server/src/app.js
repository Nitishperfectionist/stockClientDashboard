const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

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
