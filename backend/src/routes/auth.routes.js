const express = require('express');
const authRoute = express.Router()
const { signupController, loginController, logoutController, getProfileController, editProfileController, checkAuthStatus,getAllUsersController } = require('../controller/auth.controller.js')
const { signupValidator, loginValidator } = require('../validator/auth.validator.js')
const validate = require('../middleware/validate.js');
const protect = require('../middleware/auth.middleware.js');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


authRoute.post('/signup', signupValidator, validate, signupController)
authRoute.get('/',  getAllUsersController)
authRoute.post('/login', loginValidator, validate, loginController)
authRoute.post('/logout', logoutController)
authRoute.get('/profile', protect, getProfileController)
authRoute.post('/profile/edit', upload.single('profileImage'), protect, editProfileController)
authRoute.get('/check-auth', protect, checkAuthStatus)



module.exports = authRoute

