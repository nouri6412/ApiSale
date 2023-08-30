
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
function normalize_back(json) {

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

let normalize_str = '';
let sep = '';

function sub_normalize(json) {
    var ordered = sort_json(json);
    //console.log(ordered);
    var props = Object.keys(ordered);
    for (var x = 0; x < props.length; x++) {


        if (typeof ordered[props[x]] === 'object' && ordered[props[x]] !== null) {
            sub_normalize(ordered[props[x]]);

        }
        else {
            var val = '#';


            if (ordered[props[x]]) {
                val = ordered[props[x]];
                if (typeof ordered[props[x]] == 'string') {
                    val = val.replaceAll("#", "##");
                }
            }
            if (ordered[props[x]] === false) {
                val = ordered[props[x]];
            }

            if (val === '') {
                val = '#';
            }

            normalize_str = normalize_str + sep + val;
            sep = '#';
        }
    }

}
function normalize(json) {

    normalize_str = '';
    sep = '';
    //     var text = JSON.stringify(json);
    //     console.log(json);
    //     text= text.replaceAll('.0,', ".010101,");
    // console.log(text);
    //     var json_1 = JSON.parse(text);
    //console.log(json_1);
    sub_normalize(json);
    // console.log('---');
    // // var normalize_str_1 = normalize_str.replaceAll('.010101', ".0");
    // console.log(normalize_str);
    // console.log('---');
    return normalize_str;
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

    const pemContents = pem;
    //console.log(pemContents);
    // base64 decode the string to get the binary data
    const binaryDerString = atob(pemContents);

    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);

    const privateKey = await crypto.subtle.importKey(
        "pkcs8",
        binaryDer,
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: "SHA-256",
        },
        true,
        ["sign"],
    );


    //console.log(privateKey);



    // Convert string to buffer 
    const data = Buffer.from(normalize_str);

    // Sign the data and returned signature in buffer 
    const sign = crypto.sign("SHA256", data, privateKey);

    // Convert returned buffer to base64
    const signature = sign.toString('base64');

    // Printing the signature 
    //console.log(`Signature:\n\n ${signature}`);
    return signature.toString('base64');
}

async function sign_v1(normalize_str, client_id) {

    const crypto = require('crypto');

    const fs = require('fs');
    var pk = '';

    try {
        pk = fs.readFileSync(`keys/${client_id}.key`, 'utf8');

    } catch (err) {
        console.error(err);
    }
    var signature = '';
    try {
        signature =await crypto.createSign("SHA256").update(normalize_str).sign(pk).toString('base64');

    } catch (err) {
        signature = '';
    }


    return signature;
}

async function sign_v2(normalize_str, client_id) {

    const crypto = require('crypto');

    const fs = require('fs');
    var pk = '';
    try {
        pk =await fs.readFileSync(`keys/${client_id}.key`, 'utf8');

    } catch (err) {
        console.error(err);
    }


    var signature = '';
    try {
        signature =await crypto.createSign("SHA256", {
            name: 'RSASSA-PKCS1-v1_5',
            modulusLength: "2048",
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        }).update(normalize_str).sign(pk).toString('base64');
    } catch (err) {
        signature = '';
    }
    return signature;
}

middlewareObj.sign = function (data, key) {
    return sign(data, key);
};

middlewareObj.signatory = function (init_params, invoice) {
    return sign(normalize(invoice), init_params.client_id);
};

middlewareObj.signatory_v1 = function (init_params, invoice) {
    return sign_v1(normalize(invoice), init_params.client_id);
};

middlewareObj.signatory_v2 = function (init_params, invoice) {
    return sign_v2(normalize(invoice), init_params.client_id);
};

middlewareObj.signatory_v3 = function (init_params, invoice) {
    return sign_v1(normalize(invoice), init_params.client_id);
};

middlewareObj.signatory_v4 = function (init_params, invoice) {
    return sign_v1(normalize(invoice), init_params.client_id);
};

module.exports = middlewareObj;