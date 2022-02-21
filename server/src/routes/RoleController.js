const BaseController = require('./BaseController');
const RoleService = require('../service/RoleService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

class RoleController extends BaseController {
  constructor() {
    super(new RoleService());
  }

  transUpdateById = async (req, res) => {
    try {
      const resp = await this.service.transUpdateById(req.params.id, req.body);
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(404).json(error);
    }
  };

  getAuths = async (req, res) => {
    try {
      const resp = await this.service.getAuths(req.userId, req.params.role);
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(404).json(error);
    }
  };

  setInitalRoles = async (req, res) => {
    try {
      const resp = await this.service.setInitalRoles();
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(404).json(error);
    }
  };
}

const RoleControllerInstance = new RoleController();

module.exports = (router) => {
  router
    .route('/role')
    .all(verifyHeaders, verifyPayload(['name'], null, 1))
    .post(RoleControllerInstance.baseCreate);

  router
    .route('/role/:id')
    .all(verifyHeaders, verifyExistsById(), verifyPayload(['name'], null, 1))
    .put(RoleControllerInstance.transUpdateById)
    .delete(RoleControllerInstance.baseDeleteById)
    .get(RoleControllerInstance.baseGetById);

  router.get('/roles', RoleControllerInstance.baseGetAll);
  router.get('/auths/:role', RoleControllerInstance.getAuths);
  router.get('/setinitalroles', RoleControllerInstance.setInitalRoles);
};
