const config = require('../config');
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');
var signatory = require("./signatory");
const https = require('https');

var middlewareObj = {};

const agent = new https.Agent({
    rejectUnauthorized: false
});

// axiosCookieJarSupport(axios);

middlewareObj.enc = async function (callback) {
    var timest = Date.now();

    await axios.post(config.app.url_api + 'api/self-tsp/sync/GET_SERVER_INFORMATION', {
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
        .then(callback)
        .catch(error => {
            console.log(error)
        })
        .finally(() => {

        });
};

middlewareObj.get_token = async function (client_id, callback, error_callbak) {
    const pem = ``;

    var timest = Date.now();
    var GUID = crypto.randomUUID();
    var GUID_uid = crypto.randomUUID();


    var str = await signatory.signatory_v1({ private_key: pem }, {
        packet: {
            uid: GUID_uid,
            packetType: "GET_TOKEN",
            retry: false,
            data: {
                username: client_id
            },
            encryptionKeyId: null,
            symmetricKey: null,
            iv: null,
            fiscalId: client_id,
            dataSignature: null,
            requestTraceId: GUID,
            timestamp: timest,
        }
    });
    let signed = str;

    axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/GET_TOKEN', {
        packet: {
            uid: GUID_uid,
            packetType: "GET_TOKEN",
            retry: false,
            data: {
                username: client_id
            },
            encryptionKeyId: null,
            symmetricKey: null,
            iv: null,
            fiscalId: client_id,
            dataSignature: null,
            signatureKeyId: null
        },
        signatureKeyId: null,
        signature: signed
    }, {
        headers: {
            requestTraceId: GUID,
            timestamp: timest,
            // 'Content-Type': 'application/json; charset=utf-8'
        },
        withCredentials: true,
        httpsAgent: agent,
    })
        .then(response => {
            if (response.data.result) {
                if (response.data.result.data) {
                    if (response.data.result.data.token) {
                        //  console.log(response.data.result.data.token);
                        // console.log('---------------------------');
                        callback(response.data.result.data.token, response.headers['set-cookie']);
                    }
                    else {
                        error_callbak(response.data);
                    }
                }
                else {
                    error_callbak(response.data);
                }
            }
            else {
                error_callbak(response.data);
            }
        })
        .catch(error => {
            if (error.response) {
                if (error.response.data) {
                    error_callbak(error.response.data);
                }
                else {
                    error_callbak(error.response);
                }

            }
            else {

                error_callbak(error);
            }
        })
        .finally(() => {

        });
};

middlewareObj.inquiry_by_uid = async function (token, data, client_id, callback, error_callbak) {
    const pem = ``;

    var timest = Date.now();
    var GUID = await crypto.randomUUID();
    var GUID_uid = await crypto.randomUUID();


    var str = await signatory.signatory_v3({ private_key: pem }, {
        packet: {
            uid: GUID_uid,
            packetType: "INQUIRY_BY_UID",
            retry: false,
            data: data,
            encryptionKeyId: null,
            symmetricKey: null,
            iv: null,
            fiscalId: client_id,
            dataSignature: null,
            requestTraceId: GUID,
            timestamp: timest,
            Authorization: `${token}`
        }
    });
    let signed = str;

    axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/INQUIRY_BY_UID', {
        packet: {
            uid: GUID_uid,
            packetType: "INQUIRY_BY_UID",
            retry: false,
            data: data,
            encryptionKeyId: null,
            symmetricKey: null,
            iv: null,
            fiscalId: client_id,
            dataSignature: null,
            signatureKeyId: null
        },
        signatureKeyId: null,
        signature: signed
    }, {
        headers: {
            Accept: "application/json",
            requestTraceId: GUID,
            timestamp: timest,
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    })
        .then(response => {
            callback(response);
        })
        .catch(error => {
            if (error.response) {
                if (error.response.data) {
                    error_callbak(error.response.data);
                }
                else {
                    error_callbak(error.response);
                }

            }
            else {

                error_callbak(error);
            }
        })
        .finally(() => {

        });
};


middlewareObj.send_invoice = async function (token, data, client_id, callback, error_callbak) {
    const pem = ``;

    var timest = Date.now();
    var GUID = crypto.randomUUID();
    var GUID_uid = crypto.randomUUID();

    var invoice_str = await signatory.signatory_v4({ private_key: pem },  data);

    var str = await signatory.signatory_v3({ private_key: pem }, {
        packet: {
            uid: GUID_uid,
            packetType: "INVOICE.V01",
            retry: false,
            data: data,
            encryptionKeyId: null,
            symmetricKey: null,
            iv: null,
            fiscalId: client_id,
            dataSignature: invoice_str,
            requestTraceId: GUID,
            timestamp: timest,
            Authorization: `${token}`
        }
    });
    let signed = str;

    axios.post('https://tp.tax.gov.ir/req/api/self-tsp/async/normal-enqueue',
        {
            packets: [{
                uid: GUID_uid,
                packetType: "INVOICE.V01",
                retry: false,
                data: data,
                encryptionKeyId: null,
                symmetricKey: null,
                iv: null,
                fiscalId: client_id,
                dataSignature: invoice_str,
                signatureKeyId: null
            }],
            signatureKeyId: null,
            signature: signed
        }, {
        headers: {
            requestTraceId: GUID,
            timestamp: timest,
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    })
        .then(response => {
            callback(response.data);
        })
        .catch(error => {
            if (error.response) {
                if (error.response.data) {
                    error_callbak(error.response.data);
                }
                else {
                    error_callbak(error.response);
                }

            }
            else {

                error_callbak(error);
            }
        })
        .finally(() => {

        });
};

module.exports = middlewareObj;