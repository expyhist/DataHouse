const BaseController = require('./BaseController');
const UserService = require('../service/UserService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

class UserController extends BaseController {
  constructor() {
    super(new UserService());
  }

  signup = async (req, res) => {
    try {
      const resp = await this.service.signup(req.body);
      return res.status(201).json(resp);
    } catch (error) {
      return res.status(422).json(error);
    }
  };

  signin = async (req, res) => {
    try {
      const resp = await this.service.signin(req.body);
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(422).json(error);
    }
  };
}

const UserControllerInstance = new UserController();

module.exports = (router) => {
  router
    .route('/user/signup')
    .all(verifyHeaders, verifyPayload(['email', 'password'], null, 2))
    .post(UserControllerInstance.signup);

  router
    .route('/user/signin')
    .all(verifyHeaders, verifyPayload(['email', 'password'], null, 2))
    .post(UserControllerInstance.signin);

  router
    .route('/user/:id')
    .all(verifyHeaders, verifyExistsById(), verifyPayload(['email', 'password'], null, 2))
    .get(UserControllerInstance.baseGetById)
    .put(UserControllerInstance.baseUpdateById)
    .delete(UserControllerInstance.baseDeleteById);

  router.get('/users', UserControllerInstance.baseGetAll);
};
