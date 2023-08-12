
const axios = require('axios');
const fs = require('fs');

const crypto = require('crypto');

let importRsaKey = async function (pem) {
    let binStr = pemToBinary(pem);
    let keyBuf = str2ab(binStr);
    try {
        var ret = await crypto.subtle.importKey(
            "spki", keyBuf, {
            name: "RSA-OAEP",
            hash: "SHA-256",
        }, true, [
            "encrypt"
        ]
        );
        return ret;
    } catch (error) {
        console.error(error);
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
    }

};

let pemToBinary = function (pem) {
    let prtTrim, prt, prts = pem.split('\n');
    let encd = '', idx = 0, len = prts.length;
    while (idx < len) {
        prt = prts[idx];
        prtTrim = prt.trim();
        if (prtTrim.length > 0 && prt.indexOf('-BEGIN ') < 0 && prt.indexOf('-END ') < 0) encd = (encd + prtTrim);
        idx = (idx + 1);
    }
    return atob(encd);
};

let str2ab = function (str) {
    let buf = new ArrayBuffer(str.length);
    let bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
};

async function publicEncrypt(key) {
    try {
        // const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        //     modulusLength: 4096,
        // });
        var publicKey = await importRsaKey(key);
        // console.log(publicKey);
        encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from('salam')
        );
        console.log("encypted data: ", encryptedData.toString("base64"));
    } catch (error) {
        console.error(error);
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
    }
}

var timest = Date.now();
console.log(timest);
axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/GET_SERVER_INFORMATION', {
    time: 1,
    packet: {
        uid: null,
        packetType: "GET_SERVER_INFORMATION",
        retry: false,
        data: null,
        encryptionKeyId: "",
        symmetricKey: "",
        iv: "",
        fiscalId: "",
        dataSignature: ""
    }
}, {
    headers: {
        'requestTraceId': timest,
        'timestamp': timest,
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        console.log(response.data);
        if (response.data.result) {
            if (response.data.result.data) {
                if (response.data.result.data.publicKeys) {
                    console.log(response.data.result.data.publicKeys[0].key);
                    try {

                        publicEncrypt(response.data.result.data.publicKeys[0].key);

                    } catch (error) {
                        console.error(error);
                        // Expected output: ReferenceError: nonExistentFunction is not defined
                        // (Note: the exact output may be browser-dependent)
                    }

                }
            }
        }

    })
    .catch(error => {
        //  console.log(error)
    })
    .finally(() => {

    });