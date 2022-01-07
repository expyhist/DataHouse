const User = require('../models/user-model');
const userCtrl = require('../controllers/user-ctrl');
const verifyExistsByPayload = require('../utils/verifyExistsByPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .use(
      '/user',
      verifyExistsByPayload(['email', 'password'], null),
      verifyHeaders,
    )
    .post('/user/signup', userCtrl.signup)
    .post('/user/signin', userCtrl.signin);

  router
    .route('/user/:id')
    .all(verifyExistsById(User))
    .put(userCtrl.updateUserById)
    .delete(userCtrl.deleteUserById);

  router.get('/users', userCtrl.getAllUsers);
};
