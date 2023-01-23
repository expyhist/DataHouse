const BaseController = require('./BaseController');
const FilterService = require('../service/FilterService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

class FilterController extends BaseController {
  constructor() {
    super(new FilterService());
  }

  baseCreate = async (req, res) => {
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
}

const FilterControllerInstance = new FilterController();

module.exports = (router) => {
  router
    .route('/filter')
    .all(verifyHeaders, verifyPayload(['apiTableId'], 'apiTableId', null))
    .post(FilterControllerInstance.baseCreate);

  router
    .route('/filter/:id')
    .all(verifyHeaders, verifyExistsById, verifyPayload(['rangeDate', 'singleDate', 'text', 'enum'], null, null))
    .put(FilterControllerInstance.baseUpdateById)
    .delete(FilterControllerInstance.baseDeleteById)
    .get(FilterControllerInstance.baseGetById);

  router.get('/filters', FilterControllerInstance.baseGetAll);
};
