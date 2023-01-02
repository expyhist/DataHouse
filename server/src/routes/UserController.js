const BaseController = require('./BaseController');
const UserService = require('../service/UserService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

class UserController extends BaseController {
  constructor() {
    super(new UserService());
  }

  signUp = async (req, res) => {
    try {
      const resp = await this.service.signUp(req.body);
      return res.status(201).json(resp);
    } catch (error) {
      return res.status(422).json(error);
    }
  };

  signIn = async (req, res) => {
    try {
      const resp = await this.service.signIn(req.body);
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(422).json(error);
    }
  };

  publicKey = async (req, res) => {
    try {
      const resp = await this.service.publicKey();
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(404).json(error);
    }
  };
}

const UserControllerInstance = new UserController();

module.exports = (router) => {
  router
    .route('/user/signup')
    .all(verifyHeaders, verifyPayload(['email', 'password'], null, 2))
    .post(UserControllerInstance.signUp);

  router
    .route('/user/signin')
    .all(verifyHeaders, verifyPayload(['email', 'password'], null, 2))
    .post(UserControllerInstance.signIn);

  router
    .route('/user/:id')
    .all(verifyHeaders, verifyExistsById(), verifyPayload(['email', 'password'], null, 2))
    .get(UserControllerInstance.baseGetById)
    .put(UserControllerInstance.baseUpdateById)
    .delete(UserControllerInstance.baseDeleteById);

  router.get('/users', UserControllerInstance.baseGetAll);

  router.get('/publickey', UserControllerInstance.publicKey);
};
