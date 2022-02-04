const Role = require('../models/RoleModel');
const RoleService = require('../service/RoleService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/role')
    .all(verifyHeaders, verifyPayload(['name'], null, 1))
    .post(RoleService.baseGetAll);

  router
    .route('/role/:id')
    .all(verifyHeaders, verifyExistsById(Role), verifyPayload(['name'], null, 1))
    .put(RoleService.baseUpdateById)
    .delete(RoleService.baseDeleteById)
    .get(RoleService.baseGetById);

  router.get('/roles', RoleService.baseGetAll);
  router.post('/authsbyid', RoleService.getAuthsById);
  router.get('/setinitalroles', RoleService.setInitalRoles);
};
