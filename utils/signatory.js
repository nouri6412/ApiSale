
var middlewareObj = {};

function sort_json(json) {
    var ordered = Object.keys(json).sort().reduce(
        (obj, key) => {
            obj[key] = json[key];
            return obj;
        },
        {}
    );

    return ordered;
}

function normalize(json) {

    var normalize_str = '';

    var ordered = sort_json(json);

    const props = Object.keys(ordered);
    var sep = '';

    for (var x = 0; x < props.length; x++) {
        if (ordered[props[x]].length) {
            for (var y = 0; y < ordered[props[x]].length; y++) {
                ordered[props[x]][y] = sort_json(ordered[props[x]][y]);

                var sub_props = Object.keys(ordered[props[x]][y]);
                for (var i = 0; i < sub_props.length; i++) {

                    var val = '#';
                    if (ordered[props[x]][y][sub_props[i]]) {
                        val = ordered[props[x]][y][sub_props[i]];
                        val = val.replaceAll("#", "##");
                    }

                    normalize_str = normalize_str + sep + val;
                    sep = '#';
                }
            }
        }
        else {
            ordered[props[x]] = sort_json(ordered[props[x]]);
            var sub_props = Object.keys(ordered[props[x]]);
            for (var i = 0; i < sub_props.length; i++) {

                var val = '#';
                if (ordered[props[x]][sub_props[i]]) {
                    val = ordered[props[x]][sub_props[i]];
                    val = val.replaceAll("#", "##");
                }

                normalize_str = normalize_str + sep + val;
                sep = '#';
            }
        }
    }

    return normalize_str;
}
async function sign_backup(normalize_str, privateKey1) {

    const crypto = require('crypto');
    const buffer = require('buffer');

    // Create a private key
    const options = {
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: 'SHA-256' }
    };

    // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    //     modulusLength: 2048,
    // });
    const { privateKey, publicKey } =await  crypto.subtle.generateKey(
        options,
        false, // non-exportable (public key still exportable)
        ['sign', 'verify'],
    );

    console.log(privateKey);

    // Convert string to buffer 
    const data = Buffer.from(normalize_str);

    // Sign the data and returned signature in buffer 
    const sign = crypto.sign("SHA256", data, privateKey);

    // Convert returned buffer to base64
    const signature = sign.toString('base64');

    // Printing the signature 
    console.log(`Signature:\n\n ${signature}`);
    return signature.toString('base64');
}

function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

async function sign(normalize_str, pem) {

    const crypto = require('crypto');
    const buffer = require('buffer');

    // Create a private key
    const options = {
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: 'SHA-256' }
    };

    const pemContents=pem;
    //console.log(pemContents);
    // base64 decode the string to get the binary data
    const binaryDerString = atob(pemContents);

    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);

    const privateKey=await crypto.subtle.importKey(
        "pkcs8",
        binaryDer,
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-256",
        },
        true,
        ["sign"],
      );
      
    console.log(privateKey);



    // Convert string to buffer 
    const data = Buffer.from(normalize_str);

    // Sign the data and returned signature in buffer 
    const sign = crypto.sign("SHA256", data, privateKey);

    // Convert returned buffer to base64
    const signature = sign.toString('base64');

    // Printing the signature 
    console.log(`Signature:\n\n ${signature}`);
    return signature.toString('base64');
}

middlewareObj.signatory = function (init_params, invoice) {
    return sign(normalize(invoice), init_params.private_key);
};

module.exports = middlewareObj;