const { body } = require('express-validator');

// signup 
module.exports.signupValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email Required')
    .isEmail().withMessage('Invalid Email'),

  body('password')
    .notEmpty().withMessage('Password Required')
    .isLength({ min: 6 }).withMessage('Password Must Be 6 character'),

  body('username')
    .notEmpty().withMessage('username required')
    .isLength({ min: 3 }).withMessage('username must be 3 Character'),

]

module.exports.loginValidator = [

  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.username) {
      throw new Error('Email or Username is required');
    }
    return true;
  }),

  body('password')
    .notEmpty().withMessage('Password Required')
    .isLength({ min: 6 }).withMessage('Password Must Be 6 character'),
];

