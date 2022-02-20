const User = require('../models/UserModel');
const BaseDao = require('./BaseDao');

class UserDao extends BaseDao {
  constructor(conncetion) {
    super('users', User, conncetion);
    this.model = super.getModel();
  }
}

module.exports = UserDao;
