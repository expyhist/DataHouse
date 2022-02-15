const mongoose = require('mongoose');
const supertest = require('supertest');

const createServer = require('./testServer');
const dbConfig = require('../src/config/db-config');
const randomMongoObjectId = require('../src/utils/randomMongoObjectId');

beforeEach((done) => {
  mongoose
    .connect(
      `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB_TEST}`,
      dbConfig.CONNECTIONOPTIONS,
      () => done(),
    );
});

afterEach((done) => {
  mongoose.connection.close(() => done());
});

const app = createServer();

describe('test middleware', () => {
  test('Create: should not create when some keys are lost', async () => {
    await supertest(app)
      .post('/api/test/mock')
      .send({
        col1: '1',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('You must provide correct keys of json');
      });
  });

  test('Create: should not create when some values are lost', async () => {
    await supertest(app)
      .post('/api/test/mock')
      .send({
        col1: '1',
        col2: '',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('You must provide correct values of json');
      });
  });

  test('Update: should not update when length of id is error', async () => {
    await supertest(app)
      .put('/api/test/mock/0')
      .send({
        col1: '1',
        col2: '2',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('The length of id is error');
      });
  });

  test('Delete: should not delete when length of id is error', async () => {
    await supertest(app)
      .del('/api/test/mock/0')
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('The length of id is error');
      });
  });

  test('Get: should not get when length of id is error', async () => {
    await supertest(app)
      .get('/api/test/mock/0')
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('The length of id is error');
      });
  });

  test('should not get when id is not exists', async () => {
    await supertest(app)
      .get(`/api/test/mock/${randomMongoObjectId()}`)
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('The id is not existent');
      });
  });
});
