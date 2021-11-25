const express = require('express');
const router = express.Router();

const User = require('../models/user.model');
const {
  logincontroller,
  signupcontroller
} = require('../controllers/auth.controller');

router.route('/signup').post(signupcontroller);
router.route('/login').get(logincontroller);





module.exports = router;
