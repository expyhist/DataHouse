const BaseController = require('../routes/BaseController');
const MockService = require('./MockService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

class MockController extends BaseController {
  constructor(serviceInstance) {
    super(serviceInstance || new MockService());
  }
}

module.exports = (router, service) => {
  const MockControllerInstance = new MockController(service);
  router
    .route('/mock')
    .all(verifyHeaders, verifyPayload(['col1', 'col2'], null, 2))
    .post(MockControllerInstance.baseCreate);

  router
    .route('/mock/:id')
    .all(verifyHeaders, verifyExistsById(), verifyPayload(['col1', 'col2'], null, 2))
    .put(MockControllerInstance.baseUpdateById)
    .delete(MockControllerInstance.baseDeleteById)
    .get(MockControllerInstance.baseGetById);

  router.get('/mocks', MockControllerInstance.baseGetAll);
};
