const User = require('../models/UserModel');
const UserService = require('../service/UserService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/user/signup')
    .all(verifyHeaders, verifyPayload(['email', 'password'], null, 2))
    .post(UserService.signup);

  router
    .route('/user/signin')
    .all(verifyHeaders, verifyPayload(['email', 'password'], null, 2))
    .post(UserService.signin);

  router
    .route('/user/:id')
    .all(verifyHeaders, verifyExistsById(User), verifyPayload(['email', 'password'], null, 2))
    .get(UserService.baseGetById)
    .put(UserService.baseUpdateById)
    .delete(UserService.baseDeleteById);

  router.get('/users', UserService.baseGetAll);
};
