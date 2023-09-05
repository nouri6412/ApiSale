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
    const iv = crypto.randomBytes(32);

    const cipher = crypto.createCipheriv(ALGO, key, iv);

    // Hint: Larger inputs (it's GCM, after all!) should use the stream API
    let enc = cipher.update(str, 'utf8', 'base64');
    enc += cipher.final('base64');

    return [enc, iv, cipher.getAuthTag()];
  };

  // decrypt decodes base64-encoded ciphertext into a utf8-encoded string
  const decrypt = (key, enc, iv, authTag) => {
    const decipher = crypto.createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(authTag);
    let str = decipher.update(enc, 'base64', 'utf8');
    str += decipher.final('utf8');
    return str;
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
  const aoep = async (data, publicKey) => {
    const encryptedData = await crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      // We convert the data string to a buffer using `Buffer.from`
      data
    );

    return encryptedData.toString("base64");
  };

  const init = async (hex_data) => {

    var key = crypto.randomBytes(32);

    var xored_data = [];

    var i = 0;
    for (var x = 0; x < hex_data.length; x++) {
      if (i == 32) {
        i = 0;
      }
      xored_data[x] = hex_data[x] ^ key[i];
      //  console.log('hex_data:'+hex_data[x]+' key:'+key[i]+':'+(hex_data[x] ^ key[i])+' => '+xored_data[x]);
      i++;
    }
    var byte_xored_data = Buffer.from(xored_data);
    const [encrypted, iv, authTag] = encrypt(byte_xored_data.toString('base64'), key);

    return { encrypted, iv, authTag, key };

  };

  return {
    encrypt,
    decrypt,
    init,
    aoep
  };
};

// const aesCipher = aes256gcm(KEY);

// const [encrypted, iv, authTag] = aesCipher.encrypt('hello, world');
// const decrypted = aesCipher.decrypt(encrypted, iv, authTag);
// console.log(authTag);

// console.log(iv); // 'hello, world'



module.exports = middlewareObj;


