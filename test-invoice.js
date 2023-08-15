var _api = require("./utils/api_methods");


_api.get_token("A14P7E",function(token){
  //console.log('token is :'+token);
},
function(error){
  console.log(error);
}
);
return;
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
  var GUID_uid = crypto.randomUUID();
  var data={ "Header": { "Taxid": "A14P7E04C7F001B2BBB3D3", "Indatim": 1691989628000, "Indati2m": 1691989628723, "Inty": 1, "Inno": "123333", "Irtaxid": null, "Inp": 1, "Ins": 1, "Tins": "", "Tob": 1, "Bid": "1", "Tinb": "1", "Sbc": "1", "Bpc": "1", "Bbc": null, "Ft": null, "Bpn": null, "Scln": "0", "Scc": null, "Crn": "0", "Billid": null, "Tprdis": 5000.0, "Tdis": 0.0, "Tadis": 5000.0, "Tvam": 0.0, "Todam": 0.0, "Tbill": 5000.0, "Setm": 1, "Cap": 5000.0, "Insp": null, "Tvop": 0.0, "Tax17": 0.0, "Cdcn": null, "Cdcd": null, "Tonw": null, "Torv": null, "Tocv": null }, "Body": [{ "Sstid": "123", "Sstt": null, "Mu": "1627", "Am": 1.0, "Fee": 5000.0, "Cfee": null, "Cut": "IRR", "Exr": 1.0, "Prdis": 5000.0, "Dis": 0.0, "Adis": 5000.0, "Vra": 0.0, "Vam": 0.0, "Odt": "", "Odr": 0.0, "Odam": 0.0, "Olt": "", "Olr": 0.0, "Olam": 0.0, "Consfee": null, "Spro": null, "Bros": null, "Tcpbs": null, "Cop": 0.0, "Vop": 0.0, "Bsrn": "0", "Tsstam": 5000.0, "Nw": null, "Ssrv": null, "Sscv": null }], "Payments": [], "Extension": null };

  var token = '';


  var str = await signatory.signatory_v2({ private_key: pem }, {
    packet: {
      uid: GUID_uid,
      packetType: "INVOICE.V01",
      retry: false,
      data: data,
      encryptionKeyId: null,
      symmetricKey: null,
      iv: null,
      fiscalId: "A14P7E",
      dataSignature: null,
      requestTraceId: GUID,
      timestamp: timest,
      Authorization: 'Bearer ' + token
    }
  });
  let signed = str;
  console.log(str);

  axios.post('https://tp.tax.gov.ir/req/api/self-tsp/async/normal-enqueue', {
    packet: {
      uid: GUID_uid,
      packetType: "INVOICE.V01",
      retry: false,
      data: data,
      encryptionKeyId: null,
      symmetricKey: null,
      iv: null,
      fiscalId: "A14P7E",
      dataSignature: null,
      signatureKeyId: null
    },
    signatureKeyId: null,
    signature: signed
  }, {
    headers: {
      requestTraceId: GUID,
      timestamp: timest,
      Authorization: 'Bearer ' + token
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