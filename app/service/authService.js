const bcrypt = require('bcrypt');
const { User } = require('../models');
const AuthenticationError = require('../exeptions/AuthenticationError');

const signin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AuthenticationError('Email tidak valid!');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new AuthenticationError('Kredensial yang anda masukan tidak valid');
  }
  return user;
};

module.exports = { signin };
