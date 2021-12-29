const Filter = require('../models/filter-model');
const filterCtrl = require('../controllers/filter-ctrl');
const verifyExistsByProperty = require('../utils/verifyExistsByProperty');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyExistsByValue = require('../utils/verifyExistsByValue');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .use(
      '/filter',
      verifyExistsByProperty(['apiTableId']),
      verifyExistsByValue('apiTableId', 'filter'),
      verifyExistsById(Filter, /GET|PUT|DELETE/),
      verifyHeaders,
    )
    .post('/filter', filterCtrl.createFilter);

  router
    .route('/filter/:id')
    .put(filterCtrl.updateFilterById)
    .delete(filterCtrl.deleteFilterById)
    .get(filterCtrl.getFilterById);

  router.get('/filters', filterCtrl.getAllFilters);
};
