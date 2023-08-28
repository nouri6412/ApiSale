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


middlewareObj.send_invoice = async function (token, data, client_id, callback, error_callbak) {

    var timest = Date.now();
    var GUID = crypto.randomUUID();


    var pakets = [];
    var pakets_main = [];

    for (var x = 0; x < data.length; x++) {
        var GUID_uid = crypto.randomUUID();
        var invoice_str = await signatory.signatory_v4({ client_id: client_id }, data[x]);

        pakets[pakets.length] = {
            uid: GUID_uid,
            packetType: "INVOICE.V01",
            retry: false,
            data: data[x],
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
            data: data[x],
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

middlewareObj.send_invoice_v1 = async function (token, data, client_id, callback, error_callbak) {

    var timest = Date.now();
    var GUID = crypto.randomUUID();


    var pakets = [];
    var pakets_main = [];

    for (var x = 0; x < data.length; x++) {
        var GUID_uid = crypto.randomUUID();
        var invoice_str = await signatory.signatory_v4({ client_id: client_id }, data[x]);
        const { aes256gcm } = require('./aes-gcm');
       var enc=await  aes256gcm().init(Buffer.from(JSON.stringify(data[x])).toString('base64'));

//        var aoep=aes256gcm().aoep(enc.key.toString('base64'),'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxdzREOEfk3vBQogDPGTMqdDQ7t0oDhuKMZkA+Wm1lhzjjhAGfSUOuDvOKRoUEQwP8oUcXRmYzcvCUgcfoRT5iz7HbovqH+bIeJwT4rmLmFcbfPke+E3DLUxOtIZifEXrKXWgSVPkRnhMgym6UiAtnzwA1rmKstJoWpk9Nv34CYgTk8DKQN5jQJqb9L/Ng0zOEEtI3zA424tsd9zv/kP4/SaSnbbnj0evqsZ29X6aBypvnTnwH9t3gbWM4I9eAVQhPYClawHTqvdaz/O/feqfm06QBFnCgL+CBdjLs30xQSLsPICjnlV1jMzoTZnAabWP6FRzzj6C2sxw9a/WwlXrKn3gldZ7Ctv6Jso72cEeCeUI1tzHMDJPU3Qy12RQzaXujpMhCz1DVa47RvqiumpTNyK9HfFIdhgoupFkxT14XLDl65S55MF6HuQvo/RHSbBJ93FQ+2/x/Q2MNGB3BXOjNwM2pj3ojbDv3pj9CHzvaYQUYM1yOcFmIJqJ72uvVf9Jx9iTObaNNF6pl52ADmh85GTAH1hz+4pR/E9IAXUIl/YiUneYu0G4tiDY4ZXykYNknNfhSgxmn/gPHT+7kL31nyxgjiEEhK0B0vagWvdRCNJSNGWpLtlq4FlCWTAnPI5ctiFgq925e+sySjNaORCoHraBXNEwyiHT2hu5ZipIW2cCAwEAAQ==');
// console.log(aoep.toString('base64'),);
        pakets[pakets.length] = {
            uid: GUID_uid,
            packetType: "INVOICE.V01",
            retry: false,
            data: enc.encrypted,
            encryptionKeyId:  "6a2bcd88-a871-4245-a393-2843eafe6e02",
            symmetricKey: enc.key.toString('hex'),
            iv: enc.iv.toString('hex'),
            fiscalId: client_id,
            dataSignature: invoice_str
        };
        pakets_main[pakets_main.length] = {
            data: enc.encrypted,
            dataSignature: invoice_str,
            encryptionKeyId:  "6a2bcd88-a871-4245-a393-2843eafe6e02",
            fiscalId: client_id,
            iv: enc.iv.toString('hex'),
            packetType: "INVOICE.V01",
            retry: false,
            signatureKeyId: null,
            symmetricKey:enc.key.toString('hex'),
            uid: GUID_uid,
        };
    }
console.log(pakets_main);
    var str = await signatory.signatory_v3({ client_id: client_id }, {
        packets: pakets,
        requestTraceId: GUID,
        timestamp: timest,
        Authorization: `${token}`
    });
    var signed = str;

    // {
    //     "packets" : [
    //        {
    //           "data" : "EeNMDcGBEOHP0ZX71L+bJ4BmNPUM6VH3EadU78J30/P3JsBLV8AVKGCb9tQ6ih0SRWlfbmJ4dv/0QBobDtTv1e9V7gVMQtDtklK7ndc6ZpSOfbpqv2fUaNokN5AmPYfoAFHw0n8S/l3oRTnG1MTJT7bdgNojl0alGN4AE0PPge6jwdHbAVZUrPdrUwXDeXJzEREEClZWCgqyx4YSThJOsV6Z4aM0+Qf5XvX8oIB2cf3vUhFpPyorakCHsZNQ0uMigv0mYUcEQU0MOhM6xv0f8Giia9Aom6q5HUi4Ur/h4NtRzNX1Ge8BiMAxC9RtxeDtThDNA88rk3oLdwpQ/LvJimnQGN/NVSw5D74C3UQ1mfKhqSYYbT17aPtnL3VvsoqIyoWv9pkfZ1j0d68ZJxuRppQf09QhGnSKQa7AAqRewQckvRFPJ2OU+gTJ9Yk0jsZ0P7bUk//dz0HTu5VVEQNFoeUXFomK3puRDviS0bESmnj34uhTXscWS+OSf8FLqGtiar/C1dnu7WCfN2+o8ByyHwmTGwBX1IeOffAcOXtJVUbfxuPmFdFTKpl7BmV+zrB/wFKciwSyjPwIVvZHMfZ143qAuU5oOYB8vrTqGK8oHsJHYR7vMXdgMqQJtHIPVqn90mfOdM4lcnQBCari6HpFKcguPaPeR2KfSyU5H/QMLocO7v/scnzlZqe/lRjjQdzwqqOu7u3SEw+v/6Wm38ZxyXGejBIrNrG49NJqBqhLbKIu96hF12/sP5xdGffyN1RrAEz3kqNvnA+uHbtR+MzQidHCWx1eMxr2vnP6+09Ul4iVxmyAFtOdGxlUJAYGfmJTkmL3bZmOLi81PVJlTQdeKfE7/tTX0GbyxiZq6OyDpM2Q3knXMen0OS88thJMdEWT4OlaDk6HROFak3zcm93tsJngsWgQLXC92FO2wleinY/KZjeW69/7afJR14/0IdABYScBBq5ttLGxjigKoO9l9b4q+rJR3Rkt16buJ0iyK7TjnXUCuFe0r6oLXipdFc0ZiSk3CKLraNxO+tAKEavwMOy4S/BJLFBeOPgRuvo2hPCzpK9R1rTvvsXw3JaQuqHrQUNXa/mBKijAwCpBEUtMi75bVqpxLcvdXxpZa+TUsRvlOfWTDGRGyi1rE/Emlyrg0p+6YozJ3paiBw5woyPUzNJ8gN4mTlmE4pMYlY05icRuHN4IL17/eOMHEUF+1cec+TyEvFZnH8SnBxTSkM4nO+dUGtziL73bgC1T4z4IPUTmzY5L7b1XnWHPhzoBbbRXXUlKJ6fPCFS3xRkW8LXGkNqaxLEL7SrvWOw3AdbpOt80gS9F2+eZNH9wK+zZ/lssBqGlEE2NQ4tsNtOD7ATdjvjr8adXJNxiCAQeeqrSqYnz2KiDj5xwke6BS4sGaB7CJY/Eh8Qe6T+1Vb787wfvvQ1B728RM4K1Zo/RFh6TiRve9Omxfu1DQeMgSQpoQirJf2HoYY5si+gaEIV5BnPSRU9R90pUuxMGoBuxgmOWMIXZ0iZdLgjhKTmYUTZNtiCrbg8cJGL1CVIteLSu0+wCUm8MhrWJh7hzr5nDdPHiwtVR5AVIq9RRfjoGlH6Uoolqoka3f+1lZwwUXyIYrdvMVOmS//WvJw==",
    //           "dataSignature" : "FntbOaE4VFAxWU4zfHwduazU0fzLRqloNhsvmLt8Yo3z7UNuN7YZDrnwqfrSMcTR8/Czz12hWn2Qxm5/7Q3R5BqcP4GOy7ZF9ir8TnuToNcaRzKrk9cHkO8WTnhhJ8cJJRqnU8fp2SOX3CNbCZT9Dr41P6dKAPgCcSNUQuSsjg9jjm/mUGqfm5VPWHX1fZyF6nqTStI/OkEPuiR1ypcP+IBE83PmiKzG/wo8idarqNtBdD8sHvP09LtXYMB3OaRKkPnphoOCVea7brQ7epyrzFQOuFQJ24lsorx7Bm6GVppCCY/Qzwqki1VYKGGWsUl3LVibHsP9pwX0pv3r/NFrtQ==",
    //           "encryptionKeyId" : "6a2bcd88-a871-4245-a393-2843eafe6e02",
    //           "fiscalId" : "A14P7E",
    //           "iv" : "5BF67C2E6D7B810F2CFAAAABA86B3A83",
    //           "packetType" : "INVOICE.V01",
    //           "retry" : false,
    //           "signatureKeyId" : null,
    //           "symmetricKey" : "rXpjFn+zPhhw1MIfKPTNDHDGxd/rOWw3+x1Cx8LXnMrCqMgIpHhlJqddKn1q5vJexMN3j2WzeZNbtaLpwvuLVpgCQ4ele0dy5PxABuwfgHJWSLiepRGDyQvjHZOQcgPGKcyCGiYqx5uh33r6CmEa5TxilTXqvploO4AiFNbATZi0GurMj/7Pr4RPqWq7trwznvpVqv+fgjnys3c+e881v6ztlSDVs2LQ3boABTgLJvwydA4FEOIoaZmHoRS7dc9L+0FgjOJ9LOohYQ+ehpPAvdP9LuJ2bx/lra1/L/nO9r8LUgoLbBQI7kLfTSo2DfMPq9ocqTd3Ob7iKJ/9Gu09KVvIqB/7Tv/Wxat6C/ejmrNm/kf6a9jbrcQnyn2gD9F3aZmZyIhWRlzy8ZOVAxwFpAC61+Pw+9k1izinB4zPWliquc/4KveWdgT/HROOCEDG9bl7Rh+ByQ8Q8eWhg4Uv/WqZKLNHRp5PeS7xJwJ+6pj+gf6kYgMlOynoRjZjRP4iVemecQME8usPBdavBeBei0ar5nwTsJXhPfjlItdSorT7uJmnIxycPDX1YGoYSyJyyrGTj9FfdRSKC3X7KHjzWbSSLekZCnpAc7HhzGmkNF9z1cg8HcHVXdP+Tv1iGNTMj+HB83cJbqZb0SffsvzAww3iQPskFJ9BitReQMWRsKo=",
    //           "uid" : "1dec460e-0dec-4a3a-8090-1804a11b1be9"
    //        }
    //     ],
    //     "signature" : "EDYxJjk9hZ1nis6pj5MHF62O3fPP4VHjwVt7mPQOl1GNtNkul8UmDEm8ttI6ftKHfBYXj4UyYkjc28mRygFnaDrx9XV36Z27YBTolsZBgtkTPwdhpw035N5A9DiMghV2Z2x+Rf0w+x2Sg9IMed8QrEgTLJdPUSTe/X8HRASHuIvOlHtgnqNQAXHI8gjQEp9+R2+X+KqJsLBSjnUP7ZqCJIczcF5YOr1yUE/2Is4wrBERertF17aycgRMLmzCWPsjQDFUQK1ET1lPkQ4kn17XlQDk27HrjSRUiEjU2nbFy3JDK5vp7qTLX1n7kBhGQK45u0rl8B3JO4rznDdOwI78EA==",
    //     "signatureKeyId" : null
    //  }

    // {
    //     packets: [
    //       {
    //         data: [Object],
    //         dataSignature: 'VlvMtBgjf3aEi3v2BG0rEpdemKmT68+jTpOr5n2ORLXHH0GdSMN9+AZjWbn2+HFu5lFfq6EfnXkUEDgQxzc7q9/Td/nxYEeOUjukfpMuq3d1jI5l4ybpKBUTl1bf1GwELFeKpstQ7GVBPLo6IOlH7bSAzoUcJhBTF4Hq0ZSd43zbh4Ie/fySOZv9shPJbdv2G1rfxWvAey+padhh6gto3YEdVFFtj6KtuZkf8WsIy0T7/FclOswDa6Dp/X8j1t2M8fqzI5sojjxg5iyZp6+o9slRfEHA5Az+kky0iRJ61s6SR5FC1N0PyB7ZMpvXtOF6gI0qAENC9xyiDrDCbMQqGw==',
    //         encryptionKeyId: null,
    //         fiscalId: 'A14P7E',
    //         iv: null,
    //         packetType: 'INVOICE.V01',
    //         retry: false,
    //         signatureKeyId: null,
    //         symmetricKey: null,
    //         uid: '363c2c3f-f05f-4fb4-a6ca-d11e54ef1af8'
    //       }
    //     ],
    //     signature: 'B0Irqq8NV9TdQPgHv7vIogxaSfTsuOyy4U3xjp5BjJPH8SetF3QQziqdpgRpF0j6Qvm2NjAfwtI41zK0ftWTD29wrWbugxnOu8FHT2qpaM3yKwzM/nJyfHq2KGC0w4UwBu2bROd/2ETp1C7nPFoiN+Dd2Gv2G9ommNtHM3KWmOu+h8WunNluHF2m0AaAkGYA6dIIRQ8iGJ57rEVjePfu2zbtgJWKNy7gvWeW0ALHmhqjF+hFknWMtbEUKXZetOqMLisxhjvleH2nk3KG4X+weysBI6iZQ7A+9Ev5rMKAcon90LIm5XDISDp/Nwuu0e/OXC0mEqM51tIzdeRi/KOrlw==',
    //     signatureKeyId: null
    //   }

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