const ApiTable = require('../models/apitable-model');
const apiTableCtrl = require('../controllers/apitable-ctrl');
const tableCtrl = require('../controllers/table-ctrl');
const verifyExistsByPayload = require('../utils/verifyExistsByPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/apitable')
    .all(verifyHeaders, verifyExistsByPayload(['url', 'title', 'author', 'applicant'], null, 4))
    .post(apiTableCtrl.createApiTable);

  router
    .route('/apitable/:id')
    .all(verifyHeaders, verifyExistsById(ApiTable), verifyExistsByPayload(['url', 'title', 'author', 'applicant'], null, 4))
    .put(apiTableCtrl.updateApiTableById)
    .delete(apiTableCtrl.deleteApiTableById)
    .get(apiTableCtrl.getApiTableById);

  router.get('/apitables', apiTableCtrl.getAllApiTables);
  router.post('/apitabledata/:id', tableCtrl.getApiTableDataById);
};
