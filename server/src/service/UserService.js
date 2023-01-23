const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth-config');
const { decryptedByRSA } = require('../utils/cryptedByRSA');
const BaseService = require('./BaseService');
const UserDao = require('../dao/UserDao');

class UserService extends BaseService {
  constructor(daoInstance) {
    super(daoInstance || new UserDao());
  }

  signUp = async (body) => {
    try {
      const decryptedPassword = decryptedByRSA(body.password);
      const resp = await this.dao.add({
        ...body,
        ...{ password: bcrypt.hashSync(decryptedPassword, 8) },
      });
      return {
        success: true,
        id: resp._id,
        message: 'user created',
      };
    } catch (error) {
      throw {
        success: false,
        msg: error.toString(),
      };
    }
  };

  signIn = async (body) => {
    try {
      const resp = await this.dao.getOne({ email: body.email });
      const decryptedPassword = decryptedByRSA(body.password);

      const passwordIsValid = bcrypt.compareSync(
        decryptedPassword.toString(),
        resp ? resp.password : '',
      );

      if (!resp || !passwordIsValid) {
        throw new Error('Invalid Password or Username!');
      }

      const token = jwt.sign({ id: resp._id }, config.SECRET, { expiresIn: '1d' });

      return {
        success: true,
        id: resp._id,
        email: resp.email,
        rolesName: resp.rolesName,
        token,
        tokenExpires: jwt.verify(token, config.SECRET).exp * 1000,
      };
    } catch (error) {
      throw {
        success: false,
        token: null,
        msg: error.toString(),
      };
    }
  };

  getPublicKey = () => config.PUBLICKEY;
}

module.exports = UserService;
