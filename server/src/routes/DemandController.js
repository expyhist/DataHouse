const DemandDao = require('../dao/DemandDao');
const DemandService = require('../service/DemandService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/demand')
    .all(verifyHeaders, verifyPayload(['description', 'content', 'applicant', 'reviewStatus', 'status'], null, 5))
    .post(DemandService.baseCreate);

  router
    .route('/demand/:id')
    .all(verifyHeaders, verifyExistsById(DemandDao), verifyPayload(['description', 'content', 'applicant', 'reviewStatus', 'status'], null, 5))
    .put(DemandService.baseUpdateById)
    .delete(DemandService.baseDeleteById)
    .get(DemandService.baseGetById);

  router.get('/demands', DemandService.baseGetAll);
};
