const BaseController = require('./BaseController');
const ApiTableService = require('../service/ApiTableService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

class ApiTableController extends BaseController {
  constructor() {
    super(new ApiTableService());
  }

  transCreate = async (req, res) => {
    try {
      const resp = await this.service.transCreate(req.body);
      return res.status(201).json(resp);
    } catch (error) {
      return res.status(422).json(error);
    }
  };

  transUpdate = async (req, res) => {
    try {
      const resp = await this.service.transUpdate(req.params.id, req.body);
      return res.status(201).json(resp);
    } catch (error) {
      return res.status(422).json(error);
    }
  };

  transDelete = async (req, res) => {
    try {
      const resp = await this.service.transDelete(req.params.id);
      return res.status(201).json(resp);
    } catch (error) {
      return res.status(422).json(error);
    }
  };

  getApiTableData = async (req, res) => {
    try {
      const resp = await this.service.getApiTableData(req.params.id, req.body);
      return res.status(201).json(resp);
    } catch (error) {
      return res.status(422).json(error);
    }
  };
}

const ApiTableControllerInstance = new ApiTableController();

module.exports = (router) => {
  router
    .route('/apitable')
    .all(verifyHeaders, verifyPayload(['url', 'title', 'author', 'applicant'], null, 4))
    .post(ApiTableControllerInstance.transCreate);

  router
    .route('/apitable/:id')
    .all(verifyHeaders, verifyExistsById(), verifyPayload(['url', 'title', 'author', 'applicant'], null, 4))
    .put(ApiTableControllerInstance.transUpdate)
    .delete(ApiTableControllerInstance.transDelete)
    .get(ApiTableControllerInstance.baseGetById);

  router.get('/apitables', ApiTableControllerInstance.baseGetAll);
  router.post('/apitabledata/:id', ApiTableControllerInstance.getApiTableData);
};
