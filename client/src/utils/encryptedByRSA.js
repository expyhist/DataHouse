export const encryptedByRSA = (originalData, publicKey) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);

  const encryptedData = encrypt.encrypt(originalData);

  return encryptedData;
};
