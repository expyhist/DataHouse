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
      if (Object.prototype.hasOwnProperty.call(error, 'msg')) {
        return res.status(400).json({
          success: error.success,
          msg: error.msg,
        });
      }
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  };

  transUpdate = async (req, res) => {
    try {
      const resp = await this.service.transUpdate(req.params.id, req.body);
      return res.status(200).json(resp);
    } catch (error) {
      if (Object.prototype.hasOwnProperty.call(error, 'msg')) {
        return res.status(404).json({
          success: error.success,
          msg: error.msg,
        });
      }
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  };

  transDelete = async (req, res) => {
    try {
      const resp = await this.service.transDelete(req.params.id);
      return res.status(200).json(resp);
    } catch (error) {
      if (Object.prototype.hasOwnProperty.call(error, 'msg')) {
        return res.status(404).json({
          success: error.success,
          msg: error.msg,
        });
      }
      return res.status(500).json({
        success: false,
        msg: error,
      });
    }
  };

  getApiTableData = async (req, res) => {
    try {
      const resp = await this.service.getApiTableData(req.params.id, req.body);
      return res.status(200).json(resp);
    } catch (error) {
      if (Object.prototype.hasOwnProperty.call(error, 'msg')) {
        return res.status(404).json({
          success: error.success,
          msg: error.msg,
        });
      }
      return res.status(500).json({
        success: false,
        msg: error,
      });
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
    .all(verifyHeaders, verifyExistsById, verifyPayload(['url', 'title', 'author', 'applicant'], null, 4))
    .put(ApiTableControllerInstance.transUpdate)
    .delete(ApiTableControllerInstance.transDelete)
    .get(ApiTableControllerInstance.baseGetById);

  router.get('/apitables', ApiTableControllerInstance.baseGetAll);
  router.post('/apitabledata/:id', ApiTableControllerInstance.getApiTableData);
};
