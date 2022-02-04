const User = require('../models/UserModel');
const BaseDao = require('./BaseDao');

class UserDao extends BaseDao {
  constructor() {
    super('users', User);
    this.model = super.getModel();
  }
}

module.exports = new UserDao();
