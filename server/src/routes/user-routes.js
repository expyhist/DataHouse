const User = require('../models/user-model');
const userCtrl = require('../controllers/user-ctrl');
const verifyExistsByPayload = require('../utils/verifyExistsByPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/user/signup')
    .all(verifyHeaders, verifyExistsByPayload(['email', 'password'], null, 2))
    .post(userCtrl.signup);

  router
    .route('/user/signin')
    .all(verifyHeaders, verifyExistsByPayload(['email', 'password'], null, 2))
    .post(userCtrl.signin);

  router
    .route('/user/:id')
    .all(verifyHeaders, verifyExistsById(User), verifyExistsByPayload(['email', 'password'], null, 2))
    .get(userCtrl.getUserById)
    .put(userCtrl.updateUserById)
    .delete(userCtrl.deleteUserById);

  router.get('/users', userCtrl.getAllUsers);
};
