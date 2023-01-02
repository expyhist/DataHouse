const crypto = require('crypto');
const config = require('../config/auth-config');

const { PRIVATEKEY } = config;

module.exports = (encryptedData) => {
  const decryptedData = crypto.privateDecrypt(
    {
      key: PRIVATEKEY,
      padding: crypto.constants.RSA_PKCS1_PADDING,
      passphrase: '',
    },
    Buffer.from(encryptedData, 'base64'),
  );

  return decryptedData.toString();
};
