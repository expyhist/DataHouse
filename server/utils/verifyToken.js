const jwt = require('jsonwebtoken');
const config = require('../config/auth-config.js');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    console.log(req.userId, decoded);
    req.userId = decoded.id;
    next();
  });
};
