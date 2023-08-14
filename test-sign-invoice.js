const axios = require('axios');
const fs = require('fs');

const crypto = require('crypto');

try {
    pk = fs.readFileSync('./keys/fa.key', 'utf8');

} catch (err) {
    console.error(err);
}

console.log(pk);

var result = crypto.createSign("SHA256", {
    name: 'RSASSA-PKCS1-v1_5',
    modulusLength:"2048",
    publicExponent:new Uint8Array([1, 0, 1]),
    hash:"SHA-256",
}).update('salamw').sign(pk);
console.log(result.toString('base64'));