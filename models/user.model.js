const db = require('../config/db.config');
const bcrypt = require('bcryptjs');

const User = function(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
};

User.create = (newUser, result) => {
    bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) {
            result(err, null);
            return {
        }
        newUser.password = hash;
        db.query('INSERT INTO users SET ?', newUser, (err, res) => {
            if (err) {
                result(err, null);
                return {
            }
            result(null, { id: res.insertId, ...newUser });
        });
    });
};

User.findByEmail = (email, result) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
        if (err) {
            result(err, null);
            return {
        }
        if (res.length) {
            result(null, res[0]);
            return {
        }
        result({ kind: 'not_found' }, null);
    });
};

module.exports = User;
