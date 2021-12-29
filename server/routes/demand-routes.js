const Demand = require('../models/demand-model');
const demandCtrl = require('../controllers/demand-ctrl');
const verifyExistsByProperty = require('../utils/verifyExistsByProperty');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyExistsByValue = require('../utils/verifyExistsByValue');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .use(
      '/demand',
      verifyExistsByProperty(['description', 'content', 'applicant', 'reviewStatus', 'status']),
      verifyExistsByValue(null, 'demand'),
      verifyExistsById(Demand, /GET|PUT|DELETE/),
      verifyHeaders,
    )
    .post('/demand', demandCtrl.createDemand);

  router
    .route('/demand/:id')
    .put(demandCtrl.updateDemandById)
    .delete(demandCtrl.deleteDemandById)
    .get(demandCtrl.getDemandById);

  router.get('/demands', demandCtrl.getAllDemands);
};
