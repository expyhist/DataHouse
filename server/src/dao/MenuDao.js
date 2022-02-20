const Menu = require('../models/MenuModel');
const BaseDao = require('./BaseDao');

class MenuDao extends BaseDao {
  constructor(connection) {
    super('menus', Menu, connection);
    this.model = super.getModel();
  }
}

module.exports = MenuDao;
