const crypto = require('crypto');
const fs = require('fs');

const genKeyPair = () => {
    const keyPair = crypto.generateKeyPairSync('rsa',{
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
    });

    fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);
    fs.writeFileSync(__dirname + '/id_rsa_pri.pem', keyPair.privateKey);
}

genKeyPair();