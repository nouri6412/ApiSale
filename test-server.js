const axios = require('axios');
var timest = Date.now();
console.log(timest);
axios.post('https://tp.tax.gov.ir/req/api/tsp/sync/GET_SERVER_INFORMATION', {
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
                    console.log(response.data.result.data.publicKeys);
                }
            }
        }

    })
    .catch(error => {
        //  console.log(error)
    })
    .finally(() => {

    });