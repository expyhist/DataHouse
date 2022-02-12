const Filter = require('../models/FilterModel');
const FilterService = require('../service/FilterService');

const verifyPayload = require('../utils/verifyPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/filter')
    .all(verifyHeaders, verifyPayload(['apiTableId'], 'apiTableId', null))
    .post(FilterService.transCreate);

  router
    .route('/filter/:id')
    .all(verifyHeaders, verifyExistsById(Filter), verifyPayload(['rangeDate', 'singleDate', 'text', 'enum'], null, null))
    .put(FilterService.baseUpdateById)
    .delete(FilterService.baseDeleteById)
    .get(FilterService.baseGetById);

  router.get('/filters', FilterService.baseGetAll);
};
