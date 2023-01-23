const crypto = require('crypto');
const config = require('../config/auth-config');

const { PUBLICKEY, PRIVATEKEY } = config;

const encryptedByRSA = (originalData) => {
  const encryptedData = crypto.publicEncrypt(
    {
      key: PUBLICKEY,
      padding: crypto.constants.RSA_PKCS1_PADDING,
      passphrase: '',
    },
    Buffer.from(originalData),
  );

  return encryptedData.toString('base64');
};

const decryptedByRSA = (encryptedData) => {
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

module.exports = {
  encryptedByRSA,
  decryptedByRSA,
};
