const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth-config');
const BaseService = require('./BaseService');
const UserDao = require('../dao/UserDao');

class UserService extends BaseService {
  constructor() {
    super(UserDao);
  }

  signup = async (req, res) => {
    try {
      const resp = await this.instance.add({
        ...req.body,
        ...{ password: bcrypt.hashSync(req.body.password, 8) },
      });
      return res.status(201).json({
        success: true,
        id: resp._id,
        message: 'user created',
      });
    } catch (error) {
      return res.status(422).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  signin = async (req, res) => {
    try {
      const resp = await this.instance.getOne({ email: req.body.email });

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        resp ? resp.password : '',
      );

      if (!resp || !passwordIsValid) {
        return res.status(401).send({
          success: false,
          token: null,
          message: 'Invalid Password or Username!',
        });
      }

      const token = jwt.sign({ id: resp._id }, config.secret, { expiresIn: '1d' });

      return res.status(200).json({
        success: true,
        id: resp._id,
        email: resp.email,
        rolesName: resp.rolesName,
        token,
        tokenExpires: jwt.verify(token, config.secret).exp * 1000,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.toString(),
      });
    }
  };
}

module.exports = new UserService();
