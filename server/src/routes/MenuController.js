const MenuDao = require('../dao/MenuDao');
const MenuService = require('../service/MenuService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/menu')
    .all(verifyHeaders, verifyPayload(['path', 'name'], null, 2))
    .post(MenuService.baseCreate);

  router
    .route('/menu/:id')
    .all(verifyHeaders, verifyExistsById(MenuDao), verifyPayload(['path', 'name'], null, 2))
    .put(MenuService.baseUpdateById)
    .delete(MenuService.baseDeleteById)
    .get(MenuService.baseGetById);

  router.get('/menus', MenuService.baseGetAll);
  router.get('/menus/tree', MenuService.getMenusByTree);
  router.post('/menus/access', MenuService.getMenusByAccess);
  router.get('/setinitalmenus', MenuService.setInitalMenus);
};
