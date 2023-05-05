const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'mysecretkey';

const createToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.user;
  } catch (err) {
    return null;
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  createToken,
  verifyToken,
  hashPassword,
  comparePassword,
};