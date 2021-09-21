const crypto = require('crypto');

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

module.exports.genPassword = genPassword;
module.exports.validatePassword = validatePassword;