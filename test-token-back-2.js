
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
    signature: "woEQFvDLXZxDGaZajfA2Vyo8h4Cd2LE5jXq+rf477CbZ7VllaHXCBn8deo4fmeYwWZS3B6x9BG/ipQ8kPli2vlcQjqKtgs7DMNR2gttqfzPlO5+WTRk5FEZ1F4yApYySeTu09gys8HX7BNWjUZz3EEarIWs+Te9jLDbEg7xQNXIsOWlmvpUNM6znSiwjYiYimqaXL509jZVES4hJHNNGHtgZ+qcDxgdS8AqmMTHzvjz5o/Eww9/mW4UOc78mP48ce6SDDtmLlPOppx1bqHrZTVrx5ac6zn6otWRWMutUNAS3DgbwEwebUlCBoFhlg8ZfjhUAyQT2m4Y/KysfQVp31w==",
signatureKeyId : null

}, {
    headers: {
        'requestTraceId': crypto.randomUUID(),
        'timestamp': timest,
        'Content-Type': 'application/json; charset=utf-8'
    },
    httpsAgent: agent,
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        if(error.response)
        {
            console.log(error.response.data);
        }
        else
        {
            console.log(error);
        }
       
    })
    .finally(() => {

    });