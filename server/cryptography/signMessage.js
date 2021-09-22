const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const data = {
    alguna: 'data',
    importante: 'para',
    guardar: '.'
}