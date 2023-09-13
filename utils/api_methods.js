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
    _token == `eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJBMTRQN0UiLCJ0b2tlbklkIjoiMDlhY2E3ZWItMGQ0OS00MDExLWE1ZGUtMGIxODFhMmNkMWQyIiwiY3JlYXRlRGF0ZSI6MTY5NDU3OTAzNjAwNiwiY2xpZW50VHlwZSI6Ik1FTU9SWSIsInRheHBheWVySWQiOiIxMDIwMDMzODc3MCIsInN1YiI6IkExNFA3RSIsImV4cCI6MTY5NDU5MzQzNiwiaXNzIjoiVEFYIE9yZ2FuaXphdGlvbiJ9.XvJfw471dIDf0Vrvm8yiE9jFSbI9g2wC9HpDIVfZNs2st_ITsC4wK2PjbUdwwHgMQfa07HOvLK0LQYWLsS8R5Q`;
   // GUID = '8523f89b-31f8-4be0-bf2b-cf3c2b888ade';
   //timest = 1694579065671;
    publicKey.id='6a2bcd88-a871-4245-a393-2843eafe6e02';
    publicKey.key=`MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxdzREOEfk3vBQogDPGTMqdDQ7t0oDhuKMZkA+Wm1lhzjjhAGfSUOuDvOKRoUEQwP8oUcXRmYzcvCUgcfoRT5iz7HbovqH+bIeJwT4rmLmFcbfPke+E3DLUxOtIZifEXrKXWgSVPkRnhMgym6UiAtnzwA1rmKstJoWpk9Nv34CYgTk8DKQN5jQJqb9L/Ng0zOEEtI3zA424tsd9zv/kP4/SaSnbbnj0evqsZ29X6aBypvnTnwH9t3gbWM4I9eAVQhPYClawHTqvdaz/O/feqfm06QBFnCgL+CBdjLs30xQSLsPICjnlV1jMzoTZnAabWP6FRzzj6C2sxw9a/WwlXrKn3gldZ7Ctv6Jso72cEeCeUI1tzHMDJPU3Qy12RQzaXujpMhCz1DVa47RvqiumpTNyK9HfFIdhgoupFkxT14XLDl65S55MF6HuQvo/RHSbBJ93FQ+2/x/Q2MNGB3BXOjNwM2pj3ojbDv3pj9CHzvaYQUYM1yOcFmIJqJ72uvVf9Jx9iTObaNNF6pl52ADmh85GTAH1hz+4pR/E9IAXUIl/YiUneYu0G4tiDY4ZXykYNknNfhSgxmn/gPHT+7kL31nyxgjiEEhK0B0vagWvdRCNJSNGWpLtlq4FlCWTAnPI5ctiFgq925e+sySjNaORCoHraBXNEwyiHT2hu5ZipIW2cCAwEAAQ==`;
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

        str_from_key="rBhZEwzSfR3h5Bm1k3+L7LJexzY0ORYfzehyT2/QggfNRuIHCMHVCJjRlRrMESaFNI3BtZthpxnUk7kMPe0DI4zIiyWSv/g/7SOoJrKB5GSMElnsIUQIQmtc2NCjATDS4V6Eot1bwNu/arX43ZAaA/uL4j79K6+YbpcJQH8hGfVtP6YIEkPj0Gw8a6Q3TmdwdBQ9nPTkGyZvDguLaAnzCN1Jj5UD7Xra9bnsctn9pzLEFUzls/ozise8iRESCD+EuCd2fSotqRjUBxGb3qYp8wweEiyWCxuGoM1NG7FSYGxENSJ9q1spVU7BKrpWT8j62TYniHmD8gxgarpVv009nI+NRxv+JHyKYTnlHqTnCJ8rMqfWyalC7iqGlFEIXGOPadZmVFLUomgJOT6Q7031abwM/gat6vTtDvJoATrnuSk+BvReCbFEx8HeIP/mNAFyMiyXhyHW3hTrRXsandTVDC5RdGV3cPSko3J0ehIWEen7lw6VsaoSlkbMVxHY12qgp52Ldk+qpP/PfqVldI0uWBLz9p9LBlsbG6QJKD7NS/YiWFynYJJLprOzcm2p/EgxMnbQhdL6BSyKph057uVpXFt/KvQmM0rzwKMdfuKc3c6xpnh91uUV3mgnJG14yUF7OZRiBlRI1lOfLgq0/1ZcUKsgnKOpnIsosfD0AiDwTMY=";

        var encrypted = enc.encrypted;

        encrypted="hX2px3PfNvtinkgz7ncn53VHemhSdTIHX6xh//ps2jBLPDUgVd9aGe92z8NgGcCHumuSvd9IwWyQoaLValXYjGSh034eX1Ny0lEkJmUZrDget1SK9wCurNvk1DVlP54+F6Xq6Lbcd/FA6ckmzOuWyjYgi5aQcDdYagzs0yECi/Bg0cWRzx98OaWFCKi8kAMkhVbsq95Py2rBUffpNgoCxhIjjXU44jz+tdkyq7DK1iTOLyVlYIF53Kdr4Q/gBWpTvLfzikQD88Ks5dVgh3dgYCu7gwPEq1zrrXb4XeDxeJSSgQOGxg04oPXNYD05M5/xK1w0yUV4Ia/O3SXsbAMyZ4dywembMf83LI0rd6yePkI/0LmU55j9BYcHaLsbX5rNKSRnQm7/EXiGo5UHbMBG4jMaiTjRo6AUftBfC81mg0jw7w9MTSO23/A8iQtwO5UqcbX7BQlFjvBHoe5PaLaJhDgnWwkkT5gnnULnpB18ZdYMr2bmvOWpIqtJxpnXOi8VcxG4urAwYuBLdl8FpLpozafqEgADIaoPGVic/JsFymz0P19A6mV+T4jHfnxqCk7IOLi99CpQFvI8qCN2RIwjLUgDNljq+LWdkEjt6DNKdmokBoDpLDaw/SoAU1yrkTxIh5Swrl40ufY2H5N4ZyN1kT5n5zyC45LgAs5R8cnpJ1ng+4sacg1e8v0L81QHdrsz4WsezG6Q7Szb1czD5QdkmiEOrwReyQYo13vEvcneaCA5ZAA6IzVdP0wjks2RXY0KEOIJk92hvyQjz/+/VV9esAIhuO6vm1XFQepoaHB3IKGRu6l+oOrA+jhQtUJ1eypk7yg/shvtHXgw2u+NMKBBupJ7HxpEUJ0jYbbbCjeQ565Q15lPx6Ywr1p/f2sxP5vVAyONo2HC1dTxor90SDyJQwGRDk3TsC9RaUxxN49F5gBRvhU5EgRgJ9lzVOUkplAaawu6lqlVt8smBgbsBJ5PWm4uJnpnWSOUb2SXcNoG5jd4Hytr1KB7yuIIsM+q/uGMxhmL4ZXYxxWuOmGnVY51WVT6RYFzxne3M3iENMQjFRV8kKATHv1HhF8ezrpjxXT0KssHrCer6H1Q5UNVmrU7g5L8kWzyWhTtQ53/anh8nEIv90PGD4cqCXmclIlYoVquI9HGb3zy8qfHQaHkaUTYe0Ghb924RA==";
        invoice_str= "MMNiDnzey3AC/y3qWps497myXh1AeToRVB3pSHE6KEs0eiWs2VbulI1M79x4/hBIR5hqZozgxPkAvF84GSgLI+0NxsZk4tx9RPuJ/sWEq4Yx6Nos3sa0HpKNB6dETpqbyMMuEeO+e4HP6tMkcFfPPXSPXYZr/NDaCq9RAc80VMeUJUs4/VTvDX4tikRCuQ+eAN/dz+EtTupan75z9r8zgtcNSMByQluVdi5k4vpo9heB9WNi4deR1Zd/l7ENgpNn7khboIgTvroDYMJtm9b2CLbdViuQNNBSkOz5JtheImxBImlLugOSFtzPWtdgqK/efjgs+TPuMLEJQCDKx6Yh8Q==";
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