const Menu = require('../models/menu-model');
const menuCtrl = require('../controllers/menu-ctrl');
const verifyExistsByPayload = require('../utils/verifyExistsByPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/menu')
    .all(verifyHeaders, verifyExistsByPayload(['path', 'name', 'parentPath'], null, 3))
    .post(menuCtrl.createMenu);

  router
    .route('/menu/:id')
    .all(verifyHeaders, verifyExistsById(Menu), verifyExistsByPayload(['path', 'name', 'parentPath'], null, 3))
    .put(menuCtrl.updateMenuById)
    .delete(menuCtrl.deleteMenuById)
    .get(menuCtrl.getMenuById);

  router.get('/menus/:type', menuCtrl.getAllMenus);
};
