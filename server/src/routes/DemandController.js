const BaseController = require('./BaseController');
const DemandService = require('../service/DemandService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

class DemandController extends BaseController {
  constructor() {
    super(new DemandService());
  }
}

const DemandControllerInstance = new DemandController();

module.exports = (router) => {
  router
    .route('/demand')
    .all(verifyHeaders, verifyPayload(['description', 'cols', 'applicant', 'executor', 'expectedTime', 'reviewStatus', 'status'], null, 7))
    .post(DemandControllerInstance.baseCreate);

  router
    .route('/demand/:id')
    .all(verifyHeaders, verifyExistsById(), verifyPayload(['description', 'cols', 'applicant', 'executor', 'expectedTime', 'reviewStatus', 'status'], null, 7))
    .put(DemandControllerInstance.baseUpdateById)
    .delete(DemandControllerInstance.baseDeleteById)
    .get(DemandControllerInstance.baseGetById);

  router.get('/demands', DemandControllerInstance.baseGetAll);
};
