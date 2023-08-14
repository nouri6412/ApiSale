function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}


const axios = require('axios');
const fs = require('fs');

const crypto = require('crypto');
var signatory = require("./utils/signatory");
const buffer = require('buffer');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

const test = async () => {

  const pem = ``;

  var timest = Date.now();
  var GUID = crypto.randomUUID();


  var str = await signatory.signatory_v1({ private_key: pem }, {
    "packet": {
      "uid": "bc8ff813-6d01-48ea-b044-fe5e22b60460",
      "packetType": "GET_TOKEN",
      "retry": false,
      "data": {
         "username": "A14P7E"
      },
      "encryptionKeyId": null,
      "symmetricKey": null,
      "iv": null,
      "fiscalId": "A14P7E",
      "dataSignature": null,
      "signatureKeyId": null
    },
    "requestTraceId": GUID,
    "timestamp": timest
  });
  let signed = str;
  console.log(str);

  axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/GET_TOKEN', {
    "packet": {
      "uid": "bc8ff813-6d01-48ea-b044-fe5e22b60460",
      "packetType": "GET_TOKEN",
      "retry": false,
      "data": {
         "username": "A14P7E"
      },
      "encryptionKeyId": null,
      "symmetricKey": null,
      "iv": null,
      "fiscalId": "A14P7E",
      "dataSignature": null,
      "signatureKeyId": null
    },
    "signatureKeyId": null,
    "signature": signed
  }, {
    headers: {
      "requestTraceId": GUID,
      "timestamp": timest
      // 'Content-Type': 'application/json; charset=utf-8'
    },
     httpsAgent: agent,
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
      }
      else {
        console.log(error);
      }
    })
    .finally(() => {

    });
};

test();