const User = require('../models/user-model');
const userCtrl = require('../controllers/user-ctrl');
const verifyExistsByPayload = require('../utils/verifyExistsByPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/user/sign(up|in)')
    .all(verifyExistsByPayload(['email', 'password'], null), verifyHeaders)
    .post(userCtrl.signup)
    .post(userCtrl.signin);

  router
    .route('/user/:id')
    .all(verifyExistsByPayload(['email', 'password'], null), verifyHeaders, verifyExistsById(User))
    .put(userCtrl.updateUserById)
    .delete(userCtrl.deleteUserById);

  router.get('/users', userCtrl.getAllUsers);
};
