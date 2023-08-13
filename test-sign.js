const axios = require('axios');
const fs = require('fs');

const crypto = require('crypto');

try {
      pk = fs.readFileSync('./keys/fa.key', 'utf8');

} catch (err) {
    console.error(err);
}

console.log(pk);

var result = crypto.createSign("SHA256").update('salamw').sign(pk);
console.log(result.toString('base64'));