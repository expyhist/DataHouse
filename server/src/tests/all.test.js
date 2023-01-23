const testConnection = require('./testMongodb');

describe('test all', () => {
  afterAll(async () => {
    await testConnection.close();
  });

  require('./basecrud.test')(testConnection);
  require('./apitable.test')(testConnection);
  require('./filter.test')(testConnection);
  require('./menu.test')(testConnection);
  require('./middleware.test')(testConnection);
  require('./role.test')(testConnection);
  require('./user.test')(testConnection);
});
