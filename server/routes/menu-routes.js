const Menu = require('../models/menu-model');
const menuCtrl = require('../controllers/menu-ctrl');
const verifyExistsByProperty = require('../utils/verifyExistsByProperty');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyExistsByValue = require('../utils/verifyExistsByValue');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .use(
      '/menu',
      verifyExistsByProperty(['path', 'name', 'parentPath']),
      verifyExistsByValue(null, 'menu'),
      verifyExistsById(Menu, /GET|PUT|DELETE/),
      verifyHeaders,
    )
    .post('/menu', menuCtrl.createMenu);

  router
    .route('/menu/:id')
    .put(menuCtrl.updateMenuById)
    .delete(menuCtrl.deleteMenuById)
    .get(menuCtrl.getMenuById);

  router.get('/menus/:type', menuCtrl.getAllMenus);
};
