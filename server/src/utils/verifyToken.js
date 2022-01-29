const jwt = require('jsonwebtoken');
const config = require('../config/auth-config');
const User = require('../models/user-model');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.userId = decoded.id;
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    next();
  });
};
