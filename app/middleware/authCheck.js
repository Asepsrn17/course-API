/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const asyncHandler = require('express-async-handler');
const AuthenticationError = require('../exeptions/AuthenticationError');
const AuthorizationError = require('../exeptions/AuthorizationError');
const NotFoundError = require('../exeptions/NotFoundError');
const { verifyAccessToken, decodePayload } = require('../tokenize/tokenManager');
const { User } = require('../models');

exports.authCheck = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
  if (!token) {
    throw new AuthenticationError('Akses token diperlukan!');
  }
  await verifyAccessToken(token);
  const decode = await decodePayload(token);
  if (!decode) {
    throw new AuthenticationError('Token yang anda berikan tidak valid!');
  }

  const user = await User.findOne({
    where: {
      id: decode.id,
    },
    attributes: {
      exclude: ['password'],
    },
  });
  if (!user) {
    throw new NotFoundError('User tidak ditemukan!');
  }
  req.user = user;
  next();
});

exports.adminCheck = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'ADMIN') {
    return next();
  }
  throw new AuthorizationError('Anda tidak berhak mengakses resource ini!');
});
