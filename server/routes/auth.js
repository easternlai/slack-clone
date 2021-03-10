const express = require('express');
const authRouter = express.Router();
const {register, loginAuthentication} = require('../controllers/authController');

authRouter.post('/register', register);
authRouter.post('/login', loginAuthentication);

module.exports=authRouter;