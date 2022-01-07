const mongoose = require('mongoose');

const dbConfig = require('./config/db-config');
const createServer = require('./server');

mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, dbConfig.CONNECTIONOPTIONS)
  .then(() => {
    console.log('Successfully connect to MongoDB.');
  })
  .then(() => {
    const app = createServer();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });
