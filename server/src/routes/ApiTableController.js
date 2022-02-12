const ApiTable = require('../models/ApiTableModel');
const ApiTableService = require('../service/ApiTableService');
const ApiTableDataService = require('../service/ApiTableDataService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/apitable')
    .all(verifyHeaders, verifyPayload(['url', 'title', 'author', 'applicant'], null, 4))
    .post(ApiTableService.transCreate);

  router
    .route('/apitable/:id')
    .all(verifyHeaders, verifyExistsById(ApiTable), verifyPayload(['url', 'title', 'author', 'applicant'], null, 4))
    .put(ApiTableService.transUpdate)
    .delete(ApiTableService.transDelete)
    .get(ApiTableService.baseGetById);

  router.get('/apitables', ApiTableService.baseGetAll);
  router.post('/apitabledata/:id', ApiTableDataService.getApiTableData);
};
