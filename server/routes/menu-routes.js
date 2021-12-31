const Menu = require('../models/menu-model');
const menuCtrl = require('../controllers/menu-ctrl');
const verifyExistsByPayload = require('../utils/verifyExistsByPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .use(
      '/menu',
      verifyExistsByPayload(['path', 'name', 'parentPath'], null),
      verifyHeaders,
    )
    .post('/menu', menuCtrl.createMenu);

  router
    .route('/menu/:id')
    .all(verifyExistsById(Menu))
    .put(menuCtrl.updateMenuById)
    .delete(menuCtrl.deleteMenuById)
    .get(menuCtrl.getMenuById);

  router.get('/menus/:type', menuCtrl.getAllMenus);
};
