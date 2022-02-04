const jwt = require('jsonwebtoken');
const config = require('../config/auth-config');
const UserDao = require('../dao/UserDao');

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
    const userInfo = await UserDao.getById(decoded.id);
    if (!userInfo) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    next();
  });
};
