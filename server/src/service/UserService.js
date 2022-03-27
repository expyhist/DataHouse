const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth-config');
const BaseService = require('./BaseService');
const UserDao = require('../dao/UserDao');

class UserService extends BaseService {
  constructor(daoInstance) {
    super(daoInstance || new UserDao());
  }

  signUp = async (body) => {
    try {
      const resp = await this.dao.add({
        ...body,
        ...{ password: bcrypt.hashSync(body.password, 8) },
      });
      return {
        success: true,
        id: resp._id,
        message: 'user created',
      };
    } catch (error) {
      return {
        success: false,
        error: error.toString(),
      };
    }
  };

  signIn = async (body) => {
    try {
      const resp = await this.dao.getOne({ email: body.email });

      const passwordIsValid = bcrypt.compareSync(
        body.password,
        resp ? resp.password : '',
      );

      if (!resp || !passwordIsValid) {
        throw new Error('Invalid Password or Username!');
      }

      const token = jwt.sign({ id: resp._id }, config.secret, { expiresIn: '1d' });

      return {
        success: true,
        id: resp._id,
        email: resp.email,
        rolesName: resp.rolesName,
        token,
        tokenExpires: jwt.verify(token, config.secret).exp * 1000,
      };
    } catch (error) {
      return {
        success: false,
        token: null,
        error: error.toString(),
      };
    }
  };
}

module.exports = UserService;
