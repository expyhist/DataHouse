const Filter = require('../models/filter-model');
const filterCtrl = require('../controllers/filter-ctrl');
const verifyExistsByPayload = require('../utils/verifyExistsByPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .route('/filter')
    .all(verifyExistsByPayload(['apiTableId'], 'apiTableId'), verifyHeaders)
    .post(filterCtrl.createFilter);

  router
    .route('/filter/:id')
    .all(verifyExistsByPayload(['rangeData', 'singleData', 'text', 'enum'], null), verifyHeaders, verifyExistsById(Filter))
    .put(filterCtrl.updateFilterById)
    .delete(filterCtrl.deleteFilterById)
    .get(filterCtrl.getFilterById);

  router.get('/filters', filterCtrl.getAllFilters);
};
