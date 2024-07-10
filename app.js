const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});

module.exports = app;
