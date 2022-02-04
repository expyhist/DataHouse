const Menu = require('../models/MenuModel');
const BaseDao = require('./BaseDao');

class MenuDao extends BaseDao {
  constructor() {
    super('menus', Menu);
    this.model = super.getModel();
  }
}

module.exports = new MenuDao();
