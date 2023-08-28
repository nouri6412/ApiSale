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
            // "packets" : [
            //     {
            //        "data" : "Fc8u3kGptZfnnnqKqmQAPZKMrGdHJfJsZcXK5MJtnaOZqx/iQg85Y2z/Zo+MMLZ7Xk+JZK9THHUvhto0PeUjyo2n2uBrBWg8ffxcRzz4LVelPabcVUaBKENfedM29l/NJgpjIeo5frmdlr8rf+wNTYKr+XnJr7qAhW464cWlTqtRfICLWNWh99BVKscMXdE0MfKpyReBFu8pOvcDO/Z+iOVUZvoTTdMg9rXIiQIFwmNL0b5Z/NLg2Byi9waq/VdbruygVV+Fv4ERL4Cz17sY/KFNG+D60Wh6NaveZbTSQ8CwQHLO3UvMhBMcSnV6iPJSEu+perZ9qv3xQzHSgsNuVFi6l7QDDqgptK2Ph2ssKONoqNTlI6jU5DpVuv3gjyEc5t/R6S/emfk0RpEnkKlVfsjNdCS2LA5qfPi3KHACCFHJVVON53mwzd5Q34GaTruwisVS9dXSWC/BwT4lSershKLNpVK4BW1B13pw8Y1AcrVdBLSUZ+Vsj38Gys0Pg89ZUx+R3sRmDpMb5JbyvlCjd72i8jtAoKmEJyL7UWHZOU0U6AsOskHGP7N8bgLdIMjaYzLDO53BgdSmL2+j98kOaKn8louU+okB6ig2aAlz5UogCOrsxxPP5OM+Qm0LuMQM2wTsSkVny9i5VGXiiOiV4l9lc320UH5Y8wscAey7mTpPpi7AP2Os+fo7yZiBt855LbdrJDU8uJdLDpc/Bog4r4ZSGQUvaWanT0itWZwWG6vLKyJof4+Mu7aj+yMQB8Z5adE3wmXQk8xR/Ie5UMlN0Z1SUrjpfb9gZpKhOK1Ol0SmCjg1OFoyDkTcSb+BTcCrHyMBBrhOgbx13rhKDw6xGOIfCzlgmEbZ+UJoZoYrG5QvdeqSJ2QmhZ6whtRIAyZzEks457L2fLyCDUodVfnxdWi6YK3whQ1qcMB+zmF3PmipcKCpJLzTjMg+GO6rD17KBfTIf9n9Mo/kbIJRUOSF9zIlHnjGMrJYzQXuwgbIGRWs3egJnMQwKWCAKRpuYWKRUaAG8LCc5P2gbUibC4/9s8jB1TcPudN1O6G2S6QuYUMJA9k6RUfBXw5BvtJJvmkXXBbfBi/ugr19+wSkeeeN7aHT9iCj26+7F1JPz7M/tPFIdNjjhnLjwTja6RcquDPxw1Gy3xq/PIiSKa17YpKBJvl61CVOB4mKFIX0sWYMTJnhGlCgxS9NyrJyLw==",
            //        "dataSignature" : "M1OiyTb3u0+/cGLA/B6BkfYIVQCGcbjDUAtSQqd1rLQFmuEu5Zpwq+RtTlp/IXjOF3MXfhScccluobT697T8W+lurbvRvKEnITbbVoPQoISjwX1Vu2jzMLmykRnXpPnlFXWuyLqXGdnW1PcSNlJtp4/k8GgU/4tvTA4/dPDHpnNnBt/rQzDE7UMRue3HhInF+kZmJ2eG8+hZlElb5cOJdRpeVBIsL5xpulh32N8SkJxy+3Qena9uOprlU6Zp7xNYmtDSzg8xyPQDU+FO+s49TL3/5GC4HsReB7lTdsMoXNktGXTNQ7JDcvVkWT2havFS9jkRCTZ3w5enEsUCAC/5Eg==",
            //        "encryptionKeyId" : "6a2bcd88-a871-4245-a393-2843eafe6e02",
            //        "fiscalId" : "A1228Z",
            //        "iv" : "D6254BFDFE4747F694DE0B74FD403D0A",
            //        "packetType" : "INVOICE.V01",
            //        "retry" : false,
            //        "signatureKeyId" : null,
            //        "symmetricKey" : "erKhcppE7vQDIPvhg0x1mvKry7uHpCo3r7Dp25adpoNqT4cXs8L0uUgESQ2fgyLwx6yRL+96jjSPDkai5/FI7L3Sfy0mk+WfSjM0dCm7h1I4Ibg/+kIZR9kZdstP1vomug7c4dpU+7wZfjAGB7Oud8dMYMrXNLu0rRoLHj2lU9ArSyVY4826HixnpXDSypc6i6am8AwPdtS5ZUQ6z5Qpw7NoBY0ZuEXLFRg65DBDnTe8w4FjdjcOfTFPQ6v+EAcqUxbQUpWj+8CFj+PwLiDghrRdOZ1ZuqAtZ0T3FKBUhqYACNno+il0575Iy8Qq1Q12F8mCq37tptzGNkmFQjqY6BoeELcwnK5ebr/p7vqr5a7ONkXgFHQgEKmgtFqggpLUsC7ALOkBIeSgR6/JAc5HWNsRHiOC9KyGKRR8rLATFaRWWIeMYcWiDac7RK+N5xyphC4KlLgLc8WPwXTCceKEzktizDCLqEgZQcID5SJgB922b3VPvwDhfH/ohOchqsdND6Cee/Kf6ZRcsVwBy97pj6rtLMNqhV5fiMNe/qw9ALdcugMZuPpa7eUaFwwHL4vqdtaomlF2FZgb0R7FJjG4pPfaj4S7nvTI8NHLJAMe6YW8dCsCHp88fLYtjnJlhoFWaXLB9qrNoVtbB+XIpcwRolxEiTzX+dM/bb09aUtBSY4=",
            //        "uid" : "4cadc3f9-f760-466b-a57e-0b83b62513c9"
            //     }
            //  ],
            //  "signature" : "U+Fl5I89J8JfUzFWCZqCULclINw12lxy0Wulvm4hvCGpYD580IIAsCVo2BkWRsA89Fi6K1s+l6Hh/h5SbiASyYhcBel3Q2Llq2H6CMnMpMjU8Rn7/XziT+W3ps0M67aqG9IBxgQwTz6cme+O1mmW+sb2CoY7WkBoglZLQGMjdI70bC+HQnBZ3Q0nOK7y06eQwPIujk6nu26YBZlFQN8p8QqGEUD6jxiRg3tXhOOMvuC8Tp62LMH9l1WRL1AZkc0Lxy6ZW8lHABcwMWYYlM9W6iIhgwE1jvcIdlNNNC2fCTZwulifqjHb+r5y5ZWePZqfzsKn29yQ4kcjlYA84jQDxA==",
            //  "signatureKeyId" : null
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