const MockDao = require('../mock/MockDao');
const MockService = require('../mock/MockService');
const randomMongoObjectId = require('../utils/randomMongoObjectId');

module.exports = (testConnection) => {
  describe('test basecrud', () => {
    let mockInfo;
    const MockDaoInstance = new MockDao(testConnection);
    const MockServiceInstance = new MockService(MockDaoInstance);

    test('Create: should create a mock', async () => {
      const body = {
        col1: '1',
        col2: '2',
      };
      const res = await MockServiceInstance.baseCreate(body);
      mockInfo = await MockDaoInstance.getOne({ col1: '1' });
      expect(res.success).toBe(true);
      expect(res.message).toBe('mock created');
    });

    test('Create: should not create a mock when body lost col2', async () => {
      const body = {
        col1: '1',
      };
      const res = await MockServiceInstance.baseCreate(body);
      expect(res.success).toBe(false);
      expect(res.error).toBe('ValidationError: col2: Path `col2` is required.');
    });

    test('Get: should get a mock', async () => {
      const res = await MockServiceInstance.baseGetById(mockInfo._id);
      expect(res.success).toBe(true);
      expect(res.data.col1).toBe('1');
      expect(res.data.col2).toBe('2');
    });

    test('Get: should not get a mock when id is not existent', async () => {
      const res = await MockServiceInstance.baseGetById(randomMongoObjectId());
      expect(res.success).toBe(false);
      expect(res.error).toBe('Error: The id is not existent');
    });

    test('Update: should update a mock', async () => {
      const body = {
        col1: '2',
        col2: '2',
      };
      const res = await MockServiceInstance.baseUpdateById(mockInfo._id, body);
      expect(res.success).toBe(true);
      expect(res.message).toBe('mock updated');
    });

    test('Update: should not update a mock when id is not existent', async () => {
      const res = await MockServiceInstance.baseUpdateById(randomMongoObjectId(), {});
      expect(res.success).toBe(false);
      expect(res.error).toBe('Error: The id is not existent');
    });

    test('Delete: should delete a mock', async () => {
      const res = await MockServiceInstance.baseDeleteById(mockInfo._id);
      expect(res.success).toBe(true);
      expect(res.message).toBe('mock deleted');
    });

    test('Delete: should not delete a mock when id is not existent', async () => {
      const res = await MockServiceInstance.baseDeleteById(randomMongoObjectId());
      expect(res.success).toBe(false);
      expect(res.error).toBe('Error: The id is not existent');
    });
  });
};
