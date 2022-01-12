const mock = {
  apitable: {},
  user: {
    verifySignUpBodyKeyExistsMock: [
      {
        password: 'test',
      },
      {
        email: 'test',
      },
    ],
    verifySignUpBodyValueExistsMock: [
      {
        email: '',
        password: 'test',
      },
      {
        email: 'test',
        password: '',
      },
    ],
  },
};

module.exports = mock;
