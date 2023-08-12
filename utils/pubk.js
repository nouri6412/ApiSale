
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');

var middlewareObj = {};

middlewareObj.pubk = () => {

    const importRsaKey = async function (pem) {
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

    const pemToBinary = function (pem) {
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

    const str2ab = function (str) {
        let buf = new ArrayBuffer(str.length);
        let bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    };

    const publicEncrypt = async function (key,data) {
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
                data
            );

            return encryptedData;
            //   console.log("encypted data: ", encryptedData.toString("base64"));

        } catch (error) {
            console.error(error);
            // Expected output: ReferenceError: nonExistentFunction is not defined
            // (Note: the exact output may be browser-dependent)
        }
    }

    return { importRsaKey, pemToBinary, str2ab, publicEncrypt };
};
module.exports = middlewareObj;