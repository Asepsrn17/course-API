const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const { User } = require('../models');
const InvariantError = require('../exeptions/InvariantError');

const findUserByEmail = async (email) => User.findOne({
  where: {
    email,
  },
  attributes: {
    exclude: ['password'],
  },
});

const createUser = async ({ name, email, password }) => {
  try {
    const userId = `user-${nanoid()}`;
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw new InvariantError('Email sudah digunakan');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      userId,
      name,
      email,
      password: hashedPassword,
    };

    const newUser = await User.create(user);
    if (!newUser) {
      throw new Error('Gagal membuat pengguna baru');
    }
    return newUser;
  } catch (error) {
    throw new Error(`Gagal membuat pengguna baru: ${error.message}`);
  }
};

module.exports = { createUser };
