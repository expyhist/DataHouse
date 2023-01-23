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
      if (Object.prototype.hasOwnProperty.call(error, 'msg')) {
        return res.status(404).json({
          success: error.success,
          msg: error.msg,
        });
      }
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  };

  getMenusByAccess = async (req, res) => {
    try {
      const resp = await this.service.getMenusByAccess(req.params.access);
      return res.status(200).json(resp);
    } catch (error) {
      if (Object.prototype.hasOwnProperty.call(error, 'msg')) {
        return res.status(404).json({
          success: error.success,
          msg: error.msg,
        });
      }
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  };

  setInitialMenus = async (req, res) => {
    try {
      const resp = await this.service.setInitalMenus();
      return res.status(201).json(resp);
    } catch (error) {
      if (Object.prototype.hasOwnProperty.call(error, 'msg')) {
        return res.status(400).json({
          success: error.success,
          msg: error.msg,
        });
      }
      return res.status(500).json({
        success: false,
        msg: error,
      });
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
    .all(verifyHeaders, verifyExistsById, verifyPayload(['path', 'name'], null, 2))
    .put(MenuControllerInstance.baseUpdateById)
    .delete(MenuControllerInstance.baseDeleteById)
    .get(MenuControllerInstance.baseGetById);

  router.get('/menus', MenuControllerInstance.baseGetAll);
  router.get('/menus/tree', MenuControllerInstance.getMenusByTree);
  router.get('/menus/:access', MenuControllerInstance.getMenusByAccess);
  router.get('/setinitialmenus', MenuControllerInstance.setInitialMenus);
};
