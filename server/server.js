const express = require('express');
const cors = require('cors');

const db = require('./models');
const dbConfig = require('./config/db-config');
const Router = require('./routes/router');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', Router);
require('./routes/auth-routes')(app);
require('./routes/user-routes')(app);

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, dbConfig.CONNECTIONOPTIONS)
  .then(() => {
    console.log('Successfully connect to MongoDB.');
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });



const Port = process.env.PORT || 3000;
const server = app.listen(Port, () => console.log(`Server running on port ${Port}`));
server.setTimeout(0);
