const jwt = require('jsonwebtoken');
const { Base64 } = require('js-base64');
const config = require('../config/auth-config');
const rules = require('./rules');
const UserDao = require('../dao/UserDao');

module.exports = (req, res, next) => {
  const accessToken = Base64.decode(req.headers['x-access-token'] || '');

  let token;
  let email;

  if (rules.json(accessToken)) {
    token = JSON.parse(accessToken).token;
    email = JSON.parse(accessToken).email;
  }

  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, config.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.userId = decoded.id;

    const UserDaoInstance = new UserDao();
    const userInfo = await UserDaoInstance.getById(decoded.id);

    if (!userInfo) {
      return res.status(401).send({ message: 'user is not existent' });
    }

    if (userInfo && userInfo.email !== email) {
      return res.status(401).send({ message: 'user is error' });
    }
    next();
  });
};
