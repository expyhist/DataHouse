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

describe('test apitable', () => {
  test('Create: should not create when url is invalid', async () => {
    await supertest(app)
      .post('/api/apitable')
      .send({
        url: '1',
        title: '2',
        author: '3',
        applicant: '4',
        defaultParams: '{}',
      })
      .expect(422)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('ValidationError: url: 1 is not a valid url!');
      });
  });

  test('Create: should not create when defaultParams are error', async () => {
    await supertest(app)
      .post('/api/apitable')
      .send({
        url: 'https://www.test.com',
        title: 'test',
        author: 'test',
        applicant: 'test',
        defaultParams: '{1}',
      })
      .expect(422)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('ValidationError: defaultParams: Unexpected number in JSON at position 1');
      });
  });
});
