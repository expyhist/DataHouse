const MockDao = require('./MockDao');
const MockService = require('./MockService');

const verifyPayload = require('../src/utils/verifyPayload');
const verifyExistsById = require('../src/utils/verifyExistsById');
const verifyHeaders = require('../src/utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/mock')
    .all(verifyHeaders, verifyPayload(['col1', 'col2'], null, 2))
    .post(MockService.baseCreate);

  router
    .route('/mock/:id')
    .all(verifyHeaders, verifyExistsById(MockDao), verifyPayload(['col1', 'col2'], null, 2))
    .put(MockService.baseUpdateById)
    .delete(MockService.baseDeleteById)
    .get(MockService.baseGetById);

  router.get('/mocks', MockService.baseGetAll);
};
