
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

function sign(normalize_str, privateKey) {


    var crypto = require("crypto");
    var Token = require("jsonwebtoken");


    // 2. Sign verify using the generated PEM keys


    var payload = "some payload";
    //const signed = Token.sign(payload, privateKey, { algorithm: "RS256", keyid: "1" });

    const signed = Token.sign(payload, privateKey);

    //  const verified = Token.verify(signed, publicKey2, { algorithms: "RS256", complete: true });
    //console.log(verified.payload);

    return signed.toString('base64');
    // console.log(normalize_str);
    // console.log(privateKey);

    const fs = require('fs');

    // var pk='';

    // try {
    //     pk = fs.readFileSync('pk.txt', 'utf8');

    // } catch (err) {
    //     console.error(err);
    // }

    // console.log(pk);

    // Create a private key
    const { privateKey1, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });

    //console.log(privateKey1);

    // Convert string to buffer 
    const data = Buffer.from("I Love GeeksForGeeks");

    // Sign the data ad returned signature in buffer 
    const sign = crypto.sign("SHA256", data, privateKey);

    // Convert returned buffer to base64
    var signature = sign.toString('base64');

    console.log(signature);

    return signature;

    return;

    const verifiableData = normalize_str;

    // The signature method takes the data we want to sign, the
    // hashing algorithm, and the padding scheme, and generates
    // a signature in the form of bytes
    var signature = crypto.sign("sha256", Buffer.from(verifiableData), {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    });
    //     var pk= privateKey.split(String.raw`\n`).join('\n');

    //    const signature = crypto.sign('sha256', Buffer.from(verifiableData), privateKey).toString("base64"); 


    console.log(signature);

    return privateKey;
}

function sign1(normalize_str, privateKey1) {
    const crypto = require('crypto');

    const message = 'This is a message to be signed';

    // Create a sign object using the 'RSA-SHA256' algorithm
    const sign = crypto.createSign('RSA-SHA256');

    // Update the sign object with the message to be signed
    sign.update(message);

    // Generate the private key
    const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
        'MIIEpAIBAAKCAQEA6DgHBlcjg+zUvkVq3R5jFcq0f0mvj8YtfHr5r5f5x5j5v5r5\n' +
        'f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5\n' +
        'x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5\n' +
        'j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5\n' +
        'v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5\n' +
        'r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5f5x5j5v5r5\n' +
        '-----END RSA PRIVATE KEY-----\n';


    // Sign the message using the private key
    const signature = sign.sign(privateKey, 'hex');
    console.log(signature);
    return signature.toString('base64');
}

function sign2(normalize_str, privateKey1) {

    const crypto = require('crypto');
    const buffer = require('buffer');

    // Create a private key
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });

    console.log(privateKey);

    // Convert string to buffer 
    const data = Buffer.from("I Love GeeksForGeeks");

    // Sign the data and returned signature in buffer 
    const sign = crypto.sign("SHA256", data, privateKey);

    // Convert returned buffer to base64
    const signature = sign.toString('base64');

    // Printing the signature 
    console.log(`Signature:\n\n ${signature}`);
    return signature.toString('base64');
}

async function sign3(normalize_str, privateKey1) {

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

middlewareObj.signatory = function (init_params, invoice) {
    return sign3(normalize(invoice), init_params.private_key);
};

module.exports = middlewareObj;