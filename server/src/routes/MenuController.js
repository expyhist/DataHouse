const BaseController = require('./BaseController');
const MenuService = require('../service/MenuService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

class MenuController extends BaseController {
  constructor() {
    super(new MenuService());
  }

  getMenusByTree = async (req, res) => {
    try {
      const resp = await this.service.getMenusByTree();
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  getMenusByAccess = async (req, res) => {
    try {
      const resp = await this.service.getMenusByAccess(req.params.access);
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(404).json(error);
    }
  };

  setInitalMenus = async (req, res) => {
    try {
      const resp = await this.service.setInitalMenus();
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(404).json(error);
    }
  };
}

const MenuControllerInstance = new MenuController();

module.exports = (router) => {
  router
    .route('/menu')
    .all(verifyHeaders, verifyPayload(['path', 'name'], null, 2))
    .post(MenuControllerInstance.baseCreate);

  router
    .route('/menu/:id')
    .all(verifyHeaders, verifyExistsById(), verifyPayload(['path', 'name'], null, 2))
    .put(MenuControllerInstance.baseUpdateById)
    .delete(MenuControllerInstance.baseDeleteById)
    .get(MenuControllerInstance.baseGetById);

  router.get('/menus', MenuControllerInstance.baseGetAll);
  router.get('/menus/tree', MenuControllerInstance.getMenusByTree);
  router.get('/menus/:access', MenuControllerInstance.getMenusByAccess);
  router.get('/setinitalmenus', MenuControllerInstance.setInitalMenus);
};
