const Filter = require('../models/filter-model');
const filterCtrl = require('../controllers/filter-ctrl');
const verifyExistsByPayload = require('../utils/verifyExistsByPayload');
const verifyExistsById = require('../utils/verifyExistsById');
const verifyHeaders = require('../utils/verifyHeaders');

module.exports = (router) => {
  router
    .use(
      '/filter',
      verifyExistsByPayload(['apiTableId'], 'apiTableId'),
      verifyHeaders,
    )
    .post('/filter', filterCtrl.createFilter);

  router
    .route('/filter/:id')
    .all(verifyExistsById(Filter))
    .put(filterCtrl.updateFilterById)
    .delete(filterCtrl.deleteFilterById)
    .get(filterCtrl.getFilterById);

  router.get('/filters', filterCtrl.getAllFilters);
};
