const Role = require('../models/role-model');
const roleCtrl = require('../controllers/role-ctrl');
const verifyExistsByPayload = require('../utils/verifyExistsByPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/role')
    .all(verifyHeaders, verifyExistsByPayload(['name'], null, 1))
    .post(roleCtrl.createRole);

  router
    .route('/role/:id')
    .all(verifyHeaders, verifyExistsById(Role), verifyExistsByPayload(['name'], null, 1))
    .put(roleCtrl.updateRoleById)
    .delete(roleCtrl.deleteRoleById)
    .get(roleCtrl.getRoleById);

  router.get('/roles', roleCtrl.getAllRoles);
  router.post('/authsbyid', roleCtrl.getAuthsById);
  router.get('/setinitalroles', roleCtrl.setInitalRoles);
};
