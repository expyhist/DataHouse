const { encryptedByRSA } = require('../utils/cryptedByRSA');
const UserDao = require('../dao/UserDao');
const UserService = require('../service/UserService');

module.exports = (testConnection) => {
  describe('test user', () => {
    const userDaoInstance = new UserDao(testConnection);
    const userServiceInstance = new UserService(userDaoInstance);
    const truePassword = encryptedByRSA('test');
    const falsePassword = encryptedByRSA('abc');

    afterAll(async () => {
      await userDaoInstance.deleteMany({});
    });

    test('SingUp: should not create a user when email is invalid', async () => {
      const body = {
        email: 'test',
        password: truePassword,
      };
      try {
        await userServiceInstance.signUp(body);
      } catch (error) {
        expect(error.success).toBe(false);
        expect(error.msg).toBe('ValidationError: email: test is not a valid email!');
      }
    });

    test('SingUp: should create a user', async () => {
      const body = {
        email: 'test@datahouse.com',
        password: truePassword,
        rolesName: ['guest'],
      };
      const res = await userServiceInstance.signUp(body);
      expect(res.success).toBe(true);
      expect(res.message).toBe('user created');
    });

    test('SingIn: should not login when email or password is error', async () => {
      const body = {
        email: 'test@datahouse.com',
        password: falsePassword,
      };
      try {
        await userServiceInstance.signIn(body);
      } catch (error) {
        expect(error.success).toBe(false);
        expect(error.token).toBeNull();
        expect(error.msg).toBe('Error: Invalid Password or Username!');
      }
    });

    test('SingIn: should login when both email and password are right ', async () => {
      const body = {
        email: 'test@datahouse.com',
        password: truePassword,
      };
      const res = await userServiceInstance.signIn(body);
      expect(res.success).toBe(true);
      expect(res.rolesName[0]).toBe('guest');
    });
  });
};
