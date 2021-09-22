const crypto = require('crypto');

const withPrivateKey = (privateKey, encryptedMessage) => {
    return crypto.privateDecrypt(privateKey, encryptedMessage);
};

const withPublicKey = (publicKey, encryptedMessage) => {
    return crypto.publicDecrypt(publicKey, encryptedMessage);
};

module.exports.withPrivateKey = withPrivateKey;
module.exports.withPublicKey = withPublicKey;