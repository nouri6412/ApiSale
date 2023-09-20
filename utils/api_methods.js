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
        },
        // httpsAgent: agent,
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
        // httpsAgent: agent,
        withCredentials: true
    })
        .then(response => {
            callback(response.data.result);
        })
        .catch(error => {
            console.log(error);
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

middlewareObj.INQUIRY_BY_REFERENCE_NUMBER = async function (token, data, client_id, callback, error_callbak) {

    var timest = Date.now();
    var GUID = await crypto.randomUUID();
    var GUID_uid = await crypto.randomUUID();
    console.log(data);

    var str = await signatory.signatory_v3({ client_id: client_id }, {
        packet: {
            uid: GUID_uid,
            packetType: "INQUIRY_BY_REFERENCE_NUMBER",
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

    axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/INQUIRY_BY_REFERENCE_NUMBER', {
        packet: {
            uid: GUID_uid,
            packetType: "INQUIRY_BY_REFERENCE_NUMBER",
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

middlewareObj.INQUIRY_BY_TIME = async function (token, data, client_id, callback, error_callbak) {

    var timest = Date.now();
    var GUID = await crypto.randomUUID();
    var GUID_uid = await crypto.randomUUID();
    console.log(data);

    var str = await signatory.signatory_v3({ client_id: client_id }, {
        packet: {
            uid: GUID_uid,
            packetType: "INQUIRY_BY_TIME",
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

    axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/INQUIRY_BY_TIME', {
        packet: {
            uid: GUID_uid,
            packetType: "INQUIRY_BY_TIME",
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
middlewareObj.INQUIRY_BY_TIME_RANGE = async function (token, data, client_id, callback, error_callbak) {

    var timest = Date.now();
    var GUID = await crypto.randomUUID();
    var GUID_uid = await crypto.randomUUID();
    console.log(data);

    var str = await signatory.signatory_v3({ client_id: client_id }, {
        packet: {
            uid: GUID_uid,
            packetType: "INQUIRY_BY_TIME_RANGE",
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

    axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/INQUIRY_BY_TIME_RANGE', {
        packet: {
            uid: GUID_uid,
            packetType: "INQUIRY_BY_TIME_RANGE",
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

middlewareObj.send_invoice = async function (token, data, client_id, PublicKey, callback, error_callbak) {

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

middlewareObj.send_invoice_v1 = async function (token, data_input, client_id, publicKey, callback, error_callbak) {
    var _token = token;
    var timest = Date.now();
    var GUID = crypto.randomUUID();

    //test
    _token == `eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJBMTRQN0UiLCJ0b2tlbklkIjoiMGY4Zjc1MWUtOGNhYy00NWVkLWFkNzUtMmUzMDVmMGZiMzk1IiwiY3JlYXRlRGF0ZSI6MTY5NTAyMDcwODM4MiwiY2xpZW50VHlwZSI6Ik1FTU9SWSIsInRheHBheWVySWQiOiIxMDIwMDMzODc3MCIsInN1YiI6IkExNFA3RSIsImV4cCI6MTY5NTAzNTEwOCwiaXNzIjoiVEFYIE9yZ2FuaXphdGlvbiJ9.YvsZ_K1xJD4_TY8jBT-jDYkPHrAWJVXpcpnk8s0DJGV0MAG5WsdgoUZyvCu8O8rtF3vkt_yKAT90mcn6oqw2HQ`;
    // GUID = '8523f89b-31f8-4be0-bf2b-cf3c2b888ade';
    //timest = 1694579065671;
    publicKey.id = '6a2bcd88-a871-4245-a393-2843eafe6e02';
    publicKey.key = `MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxdzREOEfk3vBQogDPGTMqdDQ7t0oDhuKMZkA+Wm1lhzjjhAGfSUOuDvOKRoUEQwP8oUcXRmYzcvCUgcfoRT5iz7HbovqH+bIeJwT4rmLmFcbfPke+E3DLUxOtIZifEXrKXWgSVPkRnhMgym6UiAtnzwA1rmKstJoWpk9Nv34CYgTk8DKQN5jQJqb9L/Ng0zOEEtI3zA424tsd9zv/kP4/SaSnbbnj0evqsZ29X6aBypvnTnwH9t3gbWM4I9eAVQhPYClawHTqvdaz/O/feqfm06QBFnCgL+CBdjLs30xQSLsPICjnlV1jMzoTZnAabWP6FRzzj6C2sxw9a/WwlXrKn3gldZ7Ctv6Jso72cEeCeUI1tzHMDJPU3Qy12RQzaXujpMhCz1DVa47RvqiumpTNyK9HfFIdhgoupFkxT14XLDl65S55MF6HuQvo/RHSbBJ93FQ+2/x/Q2MNGB3BXOjNwM2pj3ojbDv3pj9CHzvaYQUYM1yOcFmIJqJ72uvVf9Jx9iTObaNNF6pl52ADmh85GTAH1hz+4pR/E9IAXUIl/YiUneYu0G4tiDY4ZXykYNknNfhSgxmn/gPHT+7kL31nyxgjiEEhK0B0vagWvdRCNJSNGWpLtlq4FlCWTAnPI5ctiFgq925e+sySjNaORCoHraBXNEwyiHT2hu5ZipIW2cCAwEAAQ==`;
    //test


    var json_str = JSON.stringify(data_input);

    json_str = json_str.replaceAll(".0,", ",");

    var data = JSON.parse(json_str);


    var pakets = [];
    var pakets_main = [];

    for (var x = 0; x < data.length; x++) {
        var GUID_uid = crypto.randomUUID();

        //test
        //  GUID_uid = '5c77534f-58c8-4d22-9539-76f6b0da241c';
        //test

        var invoice_str = await signatory.signatory_v4({ client_id: client_id }, data[x]);
        const { aes256gcm } = require('./aes-gcm');
        var enc = await aes256gcm().init(Buffer.from(JSON.stringify(data[x])));

        var public = "-----BEGIN PUBLIC KEY-----\n" + publicKey.key + "\n" + "-----END PUBLIC KEY-----";

        var aoep = await aes256gcm().aoep(enc.key, public);
        //  console.log(aoep);

        var str_from_key = aoep;

        //st str_from_key="EeTgoC7Nfz2wQXZs7fO6hf+S9YCuijmLDn4EYKQrLEEDOBjS8hOdNw8AX/TWpHk+hRpuwNrsYn5v/zgq6nOBkhl1YypJMVd7xvpGsMRLGdu0CzR3tWyahIuYT9wV/lXcGRpjiwlp6IIPBkZm5/NbqKHD9vJigSqZXLjh6GPOExm0bU372ADmJH/00dK9Gaxrbr5BtQ49GjzgO0JjCKGi5Ib424gq+i3rYCJDpq35PHXduMZ3G4DjNv60GHPvo87A4qyNHF516e8b/2Ky46klITE8bFMxaIQx4RU1QAFWN6bXOQzD6x0ufcdahXKpTjuc2BJF/RK0fTb3Q8vDetyPvNDZYqKHBZMhzW6G6OdAv1wBBe6I7TrvmYdwBYXl6f+hzYjAaTJlJt+ApsmSWr369z41U90LxTN9CM2NesceASitDpHBm1Aryo+TLqADutFIa3iRhdzoDa/mH+6BYnxwjEmQvcj5JBQda29kvOLA44xf53uFgVV9e8M043j+Qvb5EcWst8dQJlBo/EKX2uEd8JiQWtLn5SD5omHActsDlHKsUtCzMMOeGQ2JywOvLXIlCU7l31Sopbzq8p+MEYTLpLfOPCqLEExZYot440czW9CbcuTeqtTvxsfv3ZobzD0u3BiM660qP8NVyQJCqVH0QvKY3ucy/UDuELZAlFaCE1k=";
        //my str_from_key="ebNMNGJSxTaCZa0wp31J5AduBHwIVNluhb7/lqFvaI48cbQSvCieKuKTsiIa/ssDef6YBb1fZexfvVmRlDCTWux7TUKtufhB6DyS9Fcm3W4wtx4V/o4izM04Ov9SwlVI7wldJcfFicdfIqrOF0+6alrfr7/ekIFzWUN+UMQECtLt2pdR6u8Em9JIY7F1iwPpsQoZMsnwMc1bFIuV6HyEL9SHdUhL/sD8JKTBOdNfSJ7dDqBmZHpURqDDav+EfqcxC+oCzKYaHTF4cd3qXE4MT+sysOcdQJobK2KMKnN4uAcKnLoXAZg0fOA0qZtjc0Tap5t+MYaOhi8m4TWUwZEsm/horRcnr6/ha5nuptQxuGKVUnAI7k4uFtLOUDB3c5M4Or8KdRgfAFeeGZwYx4O0zheal01TFUthULrxzOCMwJU45B5oVwq1o7tVuNT/c4hc4IvWqUdoCU73/NfSfuPHJjYRR2B1CY7N7C8TUuUHRE6lYMaDsHDgjvX6WJFpa26HYKI2SELc19X8QrZJL/2NH8Hgx8N6IfzdlAPh2EVNxTqEOaURG4uCvXZKXfDD4f5rhJtZUn3ygmbQ4kunfExk85XO38g3RhNbEuDfP76X/99/tOcHvyXSiqeMaxurvnq5WldR++WbmenQgDPPT5cQi6e2Y7swK+Z6iZjPpoWDQaQ=";

        var encrypted = enc.encrypted;

        encrypted = "wcstzYSh80RnQne2+G1bpo1JN3cnzmsN3wn4QjCdmjOHxII5GyZBA2gWBv2vB3lA596/FpxO3up4IPIEMp6oZ7MFpQIJkY6eounZKG0ln0ZRP4DYqTDbH+yHM8iKXBVIRxfCgwwrTQL8elLakRCM72LTfRdueX48SC0V81+pTQKW7mPLLwZsW8nAe+YpOsBvh8p0W3n31F35xwntjLquTnCNroPdzfmhnk0Ggq4J139VkB1jpYUtKglPZsIXM4xJTgRKMsHBZT6/v37e3RXqx7P8iM9BiPcl7asMt638CnPBN7tMNsWkseI2OAJaOVCCRzpvOsJeD7qLQ7wLp+7+wowZz6ubG4b7gdKLOLd0J4yuLySSiNqrNQEEKa7ikznjxrvXjAMJyBXgZnqk/hg7hUw1Eh0LiXvcU9ev1I86z9iZZt2XZ7q9s38wEu5mGwHUh4YkZnGRKHQczUGZQVjO0TpBFysv6+2xgVzvshJzLVJmb3TLgTgTZFnv9QJpyDgNa4I8mg1HDFY05xkbPmCpyrtIZ9PP4TBoPobaMVCftmHzv3/xytKdIeLtKeYZ9kUkpSEGAuK9mrdXY88ZU/r9kjlyNA6AcmUV5tAYBX80oq57XvGGh9YY/lB06Lkp3+f8J/MjcxGiIB7J+FIy9vx5bU0ipCyPc7L/3N7VfwiGUVDT1YbG6y1HsNcqz6d9F203LILjPsLYS/1Bpt89JAeus5m7RKD+LVrwRMlxg/UQcDTjuqLzeiVC1QjcRWBT8adsK7DfhAQFNRVZXYIY3FMv43xR2cFzI7p8kpbOWgdf1Ra5HLhHVmw3lFKLX9BrwWHwYN4HvxLN70VTjNyRfnDV+dSNrIq7Ai8SNOjA+8fOL5liECezO0meZAFdm6D803kpWS6k/qAVjyF6bMC6yBu2auSwQ4LXs4qtnMV4Ol1ljxuFQdAFdWE1pjLaen0jUR/IWve9ShD/SEaVGnZ+nvj2Y9096569CR+FrW59p0KUszldUXYXDagRerKh3Zf4v7ABo54oEHbdPEKg8+4gYwJjyMvYCemSAI3VvmCZXtDZEvAUD7GXXuVe54QkbmKV7MOJaajKvX/1e9Jl/gzb/LAqWAy9TSLJJc7ZtjdTHObO7UlIka01FT/ke+fXr3Y3qW7eLJOT9S2mcWcJ0xDRe06tpw==";
        invoice_str = "GNm9MJC69L+n80B8O9g1ExuwfmU6Nh1KGXocUp8GLgNAg01fhCzatB4xhyMzBYdHg+nOD8j81LWcACPjhPXj9i+x+lvZKg4ssfosrd/S7eRrNYn+9tMuQXOemwq0wqumHxOiBKJFfTC3uqdOIATsSNNzBqKocxzq41SUiBo4l7rMiS901IX2yEm9svzjSBFgfiYKfQkEznGD9D2x4GnK34sS3BGs7BSRvDA/v0t4PeK/3fvQMvpGkQSKMoGKcDfTOk12XxClKbYP2+1hjPIWfIu1SPbgDhn38m4Br7wRKNMHTnNZKtcWsahE38nMJPTvWnobH1rD3so8GsUoASmLbg==";
        // encrypted=JSON.stringify(data[x]);
        //   var str_from_key = '';
        //console.log(aes256gcm().hexToBytes(enc.iv.toString('hex').toUpperCase()));
        pakets[pakets.length] = {
            uid: GUID_uid,
            packetType: "INVOICE.V01",
            retry: false,
            data: encrypted,
            encryptionKeyId: publicKey.id,
            symmetricKey: str_from_key,
            iv: enc.iv.toString('hex').toUpperCase(),
            fiscalId: client_id,
            dataSignature: invoice_str
        };
        pakets_main[pakets_main.length] = {
            data: encrypted,
            dataSignature: invoice_str,
            encryptionKeyId: publicKey.id,
            fiscalId: client_id,
            iv: enc.iv.toString('hex').toUpperCase(),
            packetType: "INVOICE.V01",
            retry: false,
            signatureKeyId: null,
            symmetricKey: str_from_key,
            uid: GUID_uid,
        };

    }
    //  console.log(pakets_main);
    var str = await signatory.signatory_v3({ client_id: client_id }, {
        packets: pakets,
        requestTraceId: GUID,
        timestamp: timest,
        Authorization: `${_token}`
    });
    var signed = str;

    var request_send = {
        packets: pakets_main,
        signature: signed,
        signatureKeyId: null
    };

    console.log(request_send);

    axios.post('https://tp.tax.gov.ir/req/api/self-tsp/async/normal-enqueue',
        request_send, {
        headers: {
            requestTraceId: GUID,
            timestamp: timest,
            Authorization: `Bearer ${_token}`
        },
        // httpsAgent: agent,
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