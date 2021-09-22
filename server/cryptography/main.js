const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt')

const publicKey =  fs.readFileSync(__dirname + '/id_rsa_pub.pem','utf8');

const encryptedMessage = encrypt.withPublicKey(publicKey, 'A message private');

console.log(encryptedMessage.toString());

const privateKey = fs.readFileSync(__dirname + '/id_rsa_pri.pem','utf8');

const decryptedMessage = decrypt.withPrivateKey(privateKey, encryptedMessage);

console.log(decryptedMessage.toString());

