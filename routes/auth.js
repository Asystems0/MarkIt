const router = require('express').Router();
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const {registerValidtaion, loginValidtaion} = require('../validation');
// const bcrypt = require('bcryptjs');

const {addUser, logIn} = require('../controllers/auth');

// SUBMIT A NEW USER
router.post('/register', addUser);

router.post('/login', logIn);

module.exports = router;