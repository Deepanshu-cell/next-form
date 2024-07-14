// Example using Express.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/routes');
const cors = require('cors');

// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

app.use(cors());

// auth routes
app.use('/signup', authRoutes);

// Example specifying the port and starting the server
const port = process.env.PORT || 8000; // You can use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});