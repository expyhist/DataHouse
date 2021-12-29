const ApiTable = require('../models/apitable-model');
const apiTableCtrl = require('../controllers/apitable-ctrl');
const tableCtrl = require('../controllers/table-ctrl');
const verifyExistsByProperty = require('../utils/verifyExistsByProperty');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyExistsByValue = require('../utils/verifyExistsByValue');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .use(
      '/apitable',
      verifyExistsByProperty(['url', 'title', 'author', 'applicant']),
      verifyExistsByValue(null, 'apitable'),
      verifyExistsById(ApiTable, /GET|PUT|DELETE/),
      verifyHeaders,
    )
    .post('/apitable', apiTableCtrl.createApiTable);

  router
    .route('/apitable/:id')
    .put(apiTableCtrl.updateApiTableById)
    .delete(apiTableCtrl.deleteApiTableById)
    .get(apiTableCtrl.getApiTableById);

  router.get('/apitables', apiTableCtrl.getAllApiTables);
  router.post('/apitabledata/:id', tableCtrl.getApiTableDataById);
};
