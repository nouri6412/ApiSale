const config = require('../config');
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');
var signatory = require("./signatory");
const https = require('https');

var middlewareObj = {};

const agent = new https.Agent({
    rejectUnauthorized: false,
    maxVersion: "TLSv1.2",
    minVersion: "TLSv1.2"
});


middlewareObj.enc = async function (callback,error_callbak) {
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

    axios.post(config.app.url_api + 'api/self-tsp/sync/GET_TOKEN', {
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
            timestamp: timest
            // 'Content-Type': 'application/json; charset=utf-8'
        },
        httpsAgent: agent,
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

                error_callbak(error);
            }
        })
        .finally(() => {

        });
};

middlewareObj.inquiry_by_uid = async function (token, data, client_id, callback, error_callbak) {
    const pem = ``;

    var timest = Date.now();
    var GUID = crypto.randomUUID();
    var GUID_uid = crypto.randomUUID();


    var str = await signatory.signatory_v1({ private_key: pem }, {
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
            timestamp: timest
        }
    });
    let signed = str;

    axios.post(config.app.url_api + 'api/self-tsp/async/INQUIRY_BY_UID', {"packet":{"uid":"55c6fc10-7860-49f9-9914-594e6a53e45c","packetType":"INQUIRY_BY_UID","retry":false,"data":[{"uid":"31d8eeb5-230d-4148-8d14-03f819167634","fiscalId":"A14P7E"}],"encryptionKeyId":null,"symmetricKey":null,"iv":null,"fiscalId":"A14P7E","dataSignature":null,"signatureKeyId":null},"signature":"zBN4/fhLhxzbmQgXcGf03P68u2UwfE0/LZGNak1eSaGVdfNfJjHm76R0yqLH3Lw8wrCsWM6Qh/KCizcmgrm7wV/Ui6plNK0LisfAqUwc9IOW5ZCfIl\u002BU\u002BLvvkjFgQGhSrYlHJsVnQDH9Co2E4mObwpw35LvV1Ntbj872mgC0UFXVB2GUvQM1kxAlJAoYTDGDODZxrOI/bir4OKMkGdCQ0D1dYf\u002BQAABjVK1Q2o7rSGNsMl6f59SZ3LWqQyavlURxDnk/NWfSB8BTl\u002BTah7FrLkE0O7h4MpKyJWIZcE52wsIY0cCvAd333qOj99/etUVGNQgzVwtdsdQlHKMpX6ZSow==","signatureKeyId":null}, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJBMTRQN0UiLCJ0b2tlbklkIjoiNzhlMjc2OTYtMmM5Ni00NGFiLTkyZWQtMTNlM2YwYmI4M2RlIiwiY3JlYXRlRGF0ZSI6MTY5MjE3NDQ3MzQwMiwiY2xpZW50VHlwZSI6Ik1FTU9SWSIsInRheHBheWVySWQiOiIxMDIwMDMzODc3MCIsInN1YiI6IkExNFA3RSIsImV4cCI6MTY5MjE4ODg3MywiaXNzIjoiVEFYIE9yZ2FuaXphdGlvbiJ9.d40aO9uhhcQHbZd-YeXfxCfwY612H6y4O_uT8BV2TxGn1ckgP-7zIKOb97vqTtCZUK-ykSQZCStCTlgozCRqcA",
            requestTraceId: "18c9e408-8753-43fc-b022-30292e574ee8",
            timestamp: 1692174474899,
            "Content-Type": "application/json; charset=utf-8"
            // Cookie: "cookiesession1=678B28BF262447627C0114EAD08C457D"
        },
         httpsAgent: agent
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


    var str = await signatory.signatory_v2({ private_key: pem }, {
        packet: {
            uid: GUID_uid,
            packetType: "INVOICE.V01",
            retry: false,
            data: data,
            encryptionKeyId: null,
            symmetricKey: null,
            iv: null,
            fiscalId: client_id,
            dataSignature: null,
            requestTraceId: GUID,
            timestamp: timest,
            Authorization: 'Bearer ' + token
        }
    });
    let signed = str;

    axios.post(config.app.url_api + 'api/self-tsp/async/normal-enqueue', {
        packet: {
            uid: GUID_uid,
            packetType: "INVOICE.V01",
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
            requestTraceId: GUID,
            timestamp: timest,
            Authorization: 'Bearer ' + token
            // 'Content-Type': 'application/json; charset=utf-8'
        },
        httpsAgent: agent,
    })
        .then(response => {
            callback(response.data);
        })
        .catch(error => {
            if (error.response) {
                error_callbak(error.response.data);
            }
            else {
                error_callbak(error);
            }
        })
        .finally(() => {

        });
};

module.exports = middlewareObj;