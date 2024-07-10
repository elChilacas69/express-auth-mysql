const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    const newUser = new User(req.body);
    User.create(newUser, (err, data) => {
        if (err) { res.status(500).send({ message: err.message }); }
        else res.send(data);
    });
});

router.post('/login', (req, res) => {
    User.findByEmail(req.body.email, (err, user) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({ message: 'User not found' });
            } else {
                res.status(500).send({ message: err.message });
            }
            return {
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                const token = jvt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
                res.send({ message: 'Login successful', token: token });
            } else {
                res.status(401).send(s message: 'Invalid password' });
            }
        });
    });
});

module.exports = router;
