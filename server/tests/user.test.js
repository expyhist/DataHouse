const mongoose = require('mongoose');
const supertest = require('supertest');

const createServer = require('../src/server');
const dbConfig = require('../src/config/db-config');
const mock = require('./mock');

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
  mock.user.verifySignUpBodyKeyExistsMock.forEach((mockData) => {
    test(`should not register when ${Object.keys(mockData)[0]} is not exist`, async () => {
      await supertest(app)
        .post('/api/user/signup')
        .send(mockData)
        .expect(400)
        .then((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.error).toBe('You must provide correct keys of json');
        });
    });
  });

  mock.user.verifySignUpBodyValueExistsMock.forEach((mockData) => {
    test(`should not register when ${Object.keys(mockData)[0]} is not exist`, async () => {
      await supertest(app)
        .post('/api/user/signup')
        .send(mockData)
        .expect(400)
        .then((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.error).toBe('You must provide correct values of json');
        });
    });
  });

  test('should not login when email or password is not exist', async () => {
    await supertest(app)
      .post('/api/user/signin')
      .send({
        email: '1',
        password: '1',
      })
      .expect(401)
      .then((res) => {
        expect(res.body.accessToken).toBe(null);
        expect(res.body.message).toBe('Invalid Password or Username!');
      });
  });

  test('should not update when id is not exists', async () => {
    await supertest(app)
      .put('/api/user/0')
      .send({
        username: 'test',
        password: 'test',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('The id is error');
      });
  });

  test('should not delete when id is not exists', async () => {
    await supertest(app)
      .del('/api/user/0')
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('The id is error');
      });
  });
});
