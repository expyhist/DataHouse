const Demand = require('../models/demand-model');
const demandCtrl = require('../controllers/demand-ctrl');
const verifyExistsByPayload = require('../utils/verifyExistsByPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .use(
      '/demand',
      verifyExistsByPayload(['description', 'content', 'applicant', 'reviewStatus', 'status'], null),
      verifyHeaders,
    )
    .post('/demand', demandCtrl.createDemand);

  router
    .route('/demand/:id')
    .all(verifyExistsById(Demand))
    .put(demandCtrl.updateDemandById)
    .delete(demandCtrl.deleteDemandById)
    .get(demandCtrl.getDemandById);

  router.get('/demands', demandCtrl.getAllDemands);
};