const verify = require('../routes/verifyToken');
const router = require('express').Router();
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const {registerValidtaion, loginValidtaion} = require('../validation');
// const bcrypt = require('bcryptjs');

const {addUser, logIn, changepass} = require('../controllers/auth');

// SUBMIT A NEW USER
router.post('/register', addUser);

router.post('/login', logIn);

router.patch('/changePassword', verify, changepass);

module.exports = router;