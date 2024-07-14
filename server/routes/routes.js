const express = require('express');
const { signupUser } = require('../controller/auth');
const router = express.Router();

// signup user
router.post('/', signupUser);

// export the router module so that server.js file can use it
module.exports = router;