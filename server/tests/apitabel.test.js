const mongoose = require('mongoose');
const supertest = require('supertest');

const createServer = require('../server');
const dbConfig = require('../config/db-config');

beforeEach((done) => {
  mongoose.connect(
    `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
    dbConfig.CONNECTIONOPTIONS,
    () => done(),
  );
});

afterEach((done) => {
  mongoose.connection.close(() => done());
});

const app = createServer();

describe('CURD apitable', () => {
  test('should not create or update a apitable when values are empty', async () => {
    await supertest(app)
      .post('/api/apitable')
      .send({
        url: '',
        title: '',
        author: '',
        applicant: '',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('You must provide a correct json');
      });
  });

  test('should not create or update a apitable when some keys are lost', async () => {
    await supertest(app)
      .post('/api/apitable')
      .send({
        url: '',
        title: '',
        author: '',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('You must provide a correct json');
      });
  });

  test('should not update a apitable when id is not exists', async () => {
    await supertest(app)
      .put('/api/apitable/0')
      .send({
        url: '1',
        title: '2',
        author: '3',
        applicant: '4',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('The id is error');
      });
  });

  test('should not delete a apitable when id is not exists', async () => {
    await supertest(app)
      .del('/api/apitable/0')
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('The id is error');
      });
  });

  test('should not get a apitable when id is not exists', async () => {
    await supertest(app)
      .get('/api/apitable/0')
      .expect(400)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('The id is error');
      });
  });
});
