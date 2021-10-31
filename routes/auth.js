const {verify, checkUser} = require('../routes/verifyToken');
const router = require('express').Router();
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const {registerValidtaion, loginValidtaion} = require('../validation');
// const bcrypt = require('bcryptjs');

const {addUser, logIn, logOut, changepass} = require('../controllers/auth');

// SUBMIT A NEW USER
router.post('/register', addUser);

router.post('/login', logIn);

router.get('/logOut', logOut);

router.patch('/changePassword', verify, changepass);

module.exports = router;