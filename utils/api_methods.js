const config = require('../config');
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');
var signatory = require("./signatory");
const https = require('https');
const { response } = require('express');


var middlewareObj = {};

const agent = new https.Agent({
    rejectUnauthorized: false
});


middlewareObj.get_serveer_information = async function (callback, error_callbak) {
    var timest = Date.now();

    await axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/GET_SERVER_INFORMATION', {
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
            if (response.data.result) {
                if (response.data.result.data) {
                    callback(response.data.result.data);
                }
                else {
                    error_callbak(response.data.result);
                }
            }
            else {
                error_callbak(response.data);
            }
        })
        .catch(error => {
            error_callbak(error.message);
        })
        .finally(() => {

        });
};

middlewareObj.GET_ECONOMIC_CODE_INFORMATION = async function (economicCode, callback, error_callbak) {

    var timest = Date.now();
    var GUID = await crypto.randomUUID();
    var GUID_uid = await crypto.randomUUID();


    axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/GET_ECONOMIC_CODE_INFORMATION', {
        packet: {
            uid: GUID_uid,
            packetType: "GET_ECONOMIC_CODE_INFORMATION",
            retry: false,
            data: { economicCode: economicCode },
            encryptionKeyId: null,
            symmetricKey: null,
            iv: null,
            fiscalId: null,
            dataSignature: null,
            signatureKeyId: null
        },
        signatureKeyId: null
    }, {
        headers: {
            Accept: "application/json",
            requestTraceId: GUID,
            timestamp: timest
        }
    })
        .then(response => {
            if (response.data.result) {
                if (response.data.result.data) {
                    callback(response.data.result.data);
                }
                else {
                    error_callbak(response.data.result);
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

                error_callbak(error.message);
            }
        })
        .finally(() => {

        });
};

middlewareObj.GET_FISCAL_INFORMATION = async function (token, client_id, callback, error_callbak) {

    var timest = Date.now();
    var GUID = await crypto.randomUUID();
    var GUID_uid = await crypto.randomUUID();


    var str = await signatory.signatory_v3({ client_id: client_id }, {
        packet: {
            uid: GUID_uid,
            packetType: "GET_FISCAL_INFORMATION",
            retry: false,
            data: null,
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
    var signed = str;

    axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/GET_FISCAL_INFORMATION', {
        packet: {
            uid: GUID_uid,
            packetType: "GET_FISCAL_INFORMATION",
            retry: false,
            data: null,
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
            if (response.data.result) {
                if (response.data.result.data) {
                    callback(response.data.result.data);
                }
                else {
                    error_callbak(response.data.result);
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

                error_callbak(error.message);
            }
        })
        .finally(() => {

        });
};

middlewareObj.get_token = async function (client_id, callback, error_callbak) {

    var timest = Date.now();
    var GUID = crypto.randomUUID();
    var GUID_uid = crypto.randomUUID();


    var str = await signatory.signatory_v1({ client_id: client_id }, {
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
    var signed = str;

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
            'Content-Type': 'application/json; charset=utf-8'
        },
        withCredentials: true
        // httpsAgent: agent,
    })
        .then(response => {
            if (response.data.result) {
                if (response.data.result.data) {
                    if (response.data.result.data.token) {
                        callback(response.data.result.data.token);
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

                error_callbak(error.message);
            }
        })
        .finally(() => {

        });
};

middlewareObj.inquiry_by_uid = async function (token, data, client_id, callback, error_callbak) {

    var timest = Date.now();
    var GUID = await crypto.randomUUID();
    var GUID_uid = await crypto.randomUUID();
    console.log(data);

    var str = await signatory.signatory_v3({ client_id: client_id }, {
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
    var signed = str;

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
            callback(response.data.result);
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

                error_callbak(error.message);
            }
        })
        .finally(() => {

        });
};


middlewareObj.send_invoice = async function (token, data, client_id,PublicKey, callback, error_callbak) {

    var timest = Date.now();
    var GUID = crypto.randomUUID();


    var pakets = [];
    var pakets_main = [];

    for (var x = 0; x < data.length; x++) {
        var GUID_uid = crypto.randomUUID();
        var invoice_str = await signatory.signatory_v2({ client_id: client_id }, data[x]);

        pakets[pakets.length] = {
            uid: GUID_uid,
            packetType: "INVOICE.V01",
            retry: false,
            data: JSON.stringify(data[x]),
            encryptionKeyId: null,
            symmetricKey: null,
            iv: null,
            fiscalId: client_id,
            dataSignature: invoice_str
        };
        pakets_main[pakets_main.length] = {
            uid: GUID_uid,
            packetType: "INVOICE.V01",
            retry: false,
            data: JSON.stringify(data[x]),
            encryptionKeyId: null,
            symmetricKey: null,
            iv: null,
            fiscalId: client_id,
            dataSignature: invoice_str,
            signatureKeyId: null
        };
    }

    var str = await signatory.signatory_v3({ client_id: client_id }, {
        packets: pakets,
        requestTraceId: GUID,
        timestamp: timest,
        Authorization: `${token}`
    });
    var signed = str;
     
    axios.post('https://tp.tax.gov.ir/req/api/self-tsp/async/normal-enqueue',
        {
            packets: pakets_main,
            signature: signed,
            signatureKeyId: null
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

                error_callbak(error.message);
            }
        })
        .finally(() => {

        });
};

middlewareObj.send_invoice_v2 = async function (token, data, client_id, callback, error_callbak) {

    var timest = Date.now();
    var GUID = await crypto.randomUUID();
    var GUID_uid = await crypto.randomUUID();


    var invoice_str = await signatory.signatory_v2({ client_id: client_id }, data);

    var str = await signatory.signatory_v3({ client_id: client_id }, {
        packet: {
            uid: GUID_uid,
            packetType: "INVOICE.V01",
            retry: false,
            data: JSON.stringify(data),
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
    var signed = str;

    axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/normal-enqueue', {
        packet: {
            uid: GUID_uid,
            packetType: "INVOICE.V01",
            retry: false,
            data: JSON.stringify(data),
            encryptionKeyId: null,
            symmetricKey: null,
            iv: null,
            fiscalId: client_id,
            dataSignature: invoice_str,
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
            callback(response.data.result);
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

                error_callbak(error.message);
            }
        })
        .finally(() => {

        });
};

middlewareObj.send_invoice_v1 = async function (token, data, client_id, publicKey, callback, error_callbak) {

    var timest = Date.now();
    var GUID = crypto.randomUUID();


    var pakets = [];
    var pakets_main = [];

    for (var x = 0; x < data.length; x++) {
        var GUID_uid = crypto.randomUUID();
        var invoice_str = await signatory.signatory_v4({ client_id: client_id }, data[x]);
        const { aes256gcm } = require('./aes-gcm');
        var enc = await aes256gcm().init(Buffer.from(JSON.stringify(data[x])).toString('base64'));

        var public = "-----BEGIN PUBLIC KEY-----\n" + publicKey.key + "\n" + "-----END PUBLIC KEY-----";

        var aoep =await aes256gcm().aoep(enc.key.toString('base64'), public);
      //  console.log(aoep);

         var str_from_key = aoep;

         var encrypted=enc.encrypted;
        // encrypted=JSON.stringify(data[x]);
     //   var str_from_key = '';

        pakets[pakets.length] = {
            uid: GUID_uid,
            packetType: "INVOICE.V01",
            retry: false,
            data: encrypted,
            encryptionKeyId: publicKey.id,
            symmetricKey: str_from_key,
            iv: enc.iv.toString('hex'),
            fiscalId: client_id,
            dataSignature: invoice_str
        };
        pakets_main[pakets_main.length] = {
            data:encrypted,
            dataSignature: invoice_str,
            encryptionKeyId: publicKey.id,
            fiscalId: client_id,
            iv: enc.iv.toString('hex'),
            packetType: "INVOICE.V01",
            retry: false,
            signatureKeyId: null,
            symmetricKey: str_from_key,
            uid: GUID_uid,
        };
    }
   // console.log(pakets_main);
    var str = await signatory.signatory_v3({ client_id: client_id }, {
        packets: pakets,
        requestTraceId: GUID,
        timestamp: timest,
        Authorization: `${token}`
    });
    var signed = str;

    var request_send = {
        packets: pakets_main,
        signature: signed,
        signatureKeyId: null
    };

    axios.post('https://tp.tax.gov.ir/req/api/self-tsp/async/normal-enqueue',
        request_send, {
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

                error_callbak(error.message);
            }
        })
        .finally(() => {

        });
};

module.exports = middlewareObj;