const express = require('express');
const { Logincontroller, Registercontroller } = require('../controlers/Usercontroler');

const router = express.Router();

// log in route
router.post('/login', Logincontroller);
// register route
router.post('/register', Registercontroller);



module.exports = router;