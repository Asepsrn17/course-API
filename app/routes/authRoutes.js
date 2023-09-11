const express = require('express');
const { userSignIn, userSignUp } = require('../controller/auth');
const { validateUserRegister } = require('../validator/signupValidator');
const { validateUserLogin } = require('../validator/signValidator');

const router = express.Router();

router.post('/signup', validateUserRegister, userSignUp);
router.post('/signin', validateUserLogin, userSignIn);

module.exports = router;
