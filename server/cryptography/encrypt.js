const crypto = require('crypto');

const withPublicKey = (publicKey, message) => {
    const bufferMessage = Buffer.from(message, 'utf8');

    return crypto.publicEncrypt(publicKey, bufferMessage);
}

const withPrivateKey = (privateKey, message) => {
    const bufferMessage = Buffer.from(message, 'utf8');

    return crypto.privateEncrypt(privateKey, bufferMessage);
}

module.exports.withPublicKey = withPublicKey; 
module.exports.withPrivateKey = withPrivateKey; 
