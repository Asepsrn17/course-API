/* eslint-disable import/no-extraneous-dependencies */
const asyncHandler = require('express-async-handler');
const { signin } = require('../service/authService');
const { createAccessToken } = require('../tokenize/tokenManager');
const { createUser } = require('../service/userService');

const userSignUp = asyncHandler(async (req, res) => {
  const { userId } = await createUser(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      userId,
    },
  });
});

const userSignIn = asyncHandler(async (req, res) => {
  const { userId, name, email } = await signin(req.body);
  const accessToken = await createAccessToken(userId);

  res.status(201).json({
    status: 'success',
    data: {
      name,
      email,
      accessToken,
    },
  });
});

module.exports = {
  userSignIn,
  userSignUp,
};
