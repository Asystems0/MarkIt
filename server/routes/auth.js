const {verify, checkUser} = require('./verifyToken');
const router = require('express').Router();

const {addUser, logIn, logOut, changepass} = require('../controller/auth');

// SUBMIT A NEW USER
router.post('/register', addUser);

router.post('/login', logIn);

router.get('/logOut', logOut);

router.patch('/changePassword', verify, changepass);

module.exports = router;