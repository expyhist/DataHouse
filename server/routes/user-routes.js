const User = require('../models/user-model');
const userCtrl = require('../controllers/user-ctrl');
const verifyExistsByProperty = require('../utils/verifyExistsByProperty');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyExistsByValue = require('../utils/verifyExistsByValue');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .use(
      '/user',
      verifyExistsByProperty(['username', 'email', 'password']),
      verifyExistsByValue(null, 'user'),
      verifyExistsById(User, /PUT|DELETE/),
      verifyHeaders,
    )
    .post('/user', userCtrl.createUser);

  router
    .route('/user/:id')
    .put(userCtrl.updateUserById)
    .delete(userCtrl.deleteUserById)
    .get(userCtrl.getUser);

  router.get('/users', userCtrl.getAllUsers);
};
