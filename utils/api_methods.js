const config = require('../config');
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');

var middlewareObj = {};

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

module.exports = middlewareObj;