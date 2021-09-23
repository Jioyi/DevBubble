const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname,'..','..','cryptography','id_rsa_pri.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');


const genPassword = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt,
        genHash
    }
};

const validatePassword = (password, hash, salt) => {
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === genHash;
};




const issueJWT = (user) => {
    const { ID } = user;
    const expiresIn = '1d';

    const payload = {
        sub: ID,
        iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY,{ expiresIn, algorithm: 'RS256' })

    return {
        token: `Bearer ${signedToken}`,
        expiresIn
    }
}

module.exports.genPassword = genPassword;
module.exports.validatePassword = validatePassword;
module.exports.issueJWT = issueJWT;