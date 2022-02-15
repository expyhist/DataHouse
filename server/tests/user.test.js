const mongoose = require('mongoose');
const supertest = require('supertest');

const createServer = require('../src/server');
const dbConfig = require('../src/config/db-config');

beforeEach((done) => {
  mongoose.connect(
    `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB_TEST}`,
    dbConfig.CONNECTIONOPTIONS,
    () => done(),
  );
});

afterEach((done) => {
  mongoose.connection.close(() => done());
});

const app = createServer();

describe('test user', () => {
  test('should not login when email or password is not exist', async () => {
    await supertest(app)
      .post('/api/user/signin')
      .send({
        email: '1',
        password: '1',
      })
      .expect(401)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.token).toBe(null);
        expect(res.body.message).toBe('Invalid Password or Username!');
      });
  });
});
