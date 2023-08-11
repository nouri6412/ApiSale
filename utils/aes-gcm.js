const buffer = require('buffer');
const crypto = require('crypto');

var middlewareObj = {};

// Demo implementation of using `aes-256-gcm` with node.js's `crypto` lib.
middlewareObj.aes256gcm = () => {
  const ALGO = 'aes-256-gcm';

  // encrypt returns base64-encoded ciphertext
  const encrypt = (str, key) => {
    // The `iv` for a given key must be globally unique to prevent
    // against forgery attacks. `randomBytes` is convenient for
    // demonstration but a poor way to achieve this in practice.
    //
    // See: e.g. https://csrc.nist.gov/publications/detail/sp/800-38d/final
    const iv = Buffer.from(crypto.randomBytes(32), 'utf8');

    const cipher = crypto.createCipheriv(ALGO, key, iv);

    // Hint: Larger inputs (it's GCM, after all!) should use the stream API
    let enc = cipher.update(str, 'utf8', 'base64');
    enc += cipher.final('base64');
    return [ enc, iv, cipher.getAuthTag()];
  };

  // decrypt decodes base64-encoded ciphertext into a utf8-encoded string
  const decrypt = (key, enc, iv, authTag) => {
    const decipher = crypto.createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(authTag);
    let str = decipher.update(enc, 'base64', 'utf8');
    str += decipher.final('utf8');
    return str;
  };

  const xor = (hex1, hex2) => {

    const buf1 = Buffer.from(hex1.substring(0, hex2.length), 'hex');
    const buf2 = Buffer.from(hex2, 'hex');

    const bufResult = buf1.map((b, i) => b ^ buf2[i]);
    return bufResult.toString('hex');
  };

  const base64ToHex = (str) => {
    const raw = atob(str);
    let result = '';
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      result += (hex.length === 2 ? hex : '0' + hex);
    }
    return result.toUpperCase();
  }

  const init = (data) => {
    var hex_data = base64ToHex(data);
    // hex_data='0101'+hex_data;

    var key = Buffer.from(crypto.randomBytes(32), 'utf8');
    var v1 = hex_data.length;
    var v2 = 32;
    var v3 = v1 % v2;
    var v4 = v1 / v2;

    if (v3 > 0) {
      v1 = v1 - v3;
      v4 = (v1 / v2) + 1;
    }

    var hex1 = key.toString('hex');

    var hex2 = hex_data;
    // console.log(hex_data);
    // console.log('--');
    var xored_data = '';
    for (var x = 0; x < v4; x++) {
      xored_data = xored_data + xor(hex1, hex2.substring(x * 32, (x * 32) + 32));
    }

    const [encrypted, iv, authTag] = encrypt(xored_data, key);
console.log(xored_data);
  };

  return {
    encrypt,
    decrypt,
    xor,
    init
  };
};

// const aesCipher = aes256gcm(KEY);

// const [encrypted, iv, authTag] = aesCipher.encrypt('hello, world');
// const decrypted = aesCipher.decrypt(encrypted, iv, authTag);
// console.log(authTag);

// console.log(iv); // 'hello, world'



module.exports = middlewareObj;


