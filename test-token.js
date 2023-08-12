
const axios = require('axios');
const https = require('https');
const fs = require('fs');

const crypto = require('crypto');

var timest = Date.now();
console.log(timest);

const agent = new https.Agent({
    rejectUnauthorized: false
});


axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/GET_TOKEN', {
    time: 1,
    packet: {
        uid: null,
        packetType: "GET_TOKEN",
        retry: false,
        data: { username: "A161XE" },
        encryptionKeyId: null,
        symmetricKey: "",
        iv: null,
        fiscalId: "A161XE",
        dataSignature: null
    },
    signature: "SsF31ROXaK07uWMTF99EZWR7Vbtw48J6cwnTvXjGFfvOXw4sUPYP7cM2yVpB6uk4y0BFlLrTNVE+wM2dLgIXF5rv98Srm01tu2meqbUPuzC/3bhXRxHJL7TugYn6tT8uBC2KzdVsbY7/Ybeoa8ExwDMldRySKClyURZK2o3GbytRGSl15wMRd/yiCAqgm41fDkKW3D76ISTvR6N5JU/v0MWTeISSIpHNueZFC1Ebj2MNi4SvQRoITCqqw2bqBfuBeAaKgORANgzmLgF+vjs8RzUXAoaoYvywfBedh0dD9M96A2l/MejVzETf0bsgCiBkB6Ixc5Yxcnq7UNA2+GG5jQ==",
    signatureKeyId: null

}, {
    headers: {
        'requestTraceId': crypto.randomUUID(),
        'timestamp': timest,
        'Content-Type': 'application/json; charset=utf-8',
        'Accept-Encoding':null
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