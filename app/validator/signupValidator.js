const { body, validationResult } = require('express-validator');
const InvariantError = require('../exeptions/InvariantError');

exports.validateUserRegister = [
  body('name')
    .notEmpty()
    .withMessage('name tidak boleh kosong.')
    .isString()
    .withMessage('name harus berupa string'),
  body('email')
    .notEmpty()
    .withMessage('Email tidak boleh kosong')
    .isEmail()
    .withMessage('masukkan email valid.'),
  body('password')
    .notEmpty()
    .withMessage('Passsword tidak boleh kosong')
    .isString()
    .withMessage('Password harus berupa string')
    .isLength({ min: 10 })
    .withMessage('Password harus lebih dari 10 karakter'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];
