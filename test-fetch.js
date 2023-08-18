const fetch = require('node-fetch');

// Propmise then/catch block
// Make request
fetch('https://tp.tax.gov.ir/req/api/self-tsp/sync/INQUIRY_BY_UID', {
    method: 'POST',
    body: JSON.stringify({
        "packet": {
            "data": [
                {
                    "fiscalId": "A14P7E",
                    "uid": "9d6b38b6-d584-4838-a9b8-e32110832148"
                }
            ],
            "dataSignature": null,
            "encryptionKeyId": null,
            "fiscalId": "A14P7E",
            "iv": null,
            "packetType": "INQUIRY_BY_UID",
            "retry": false,
            "signatureKeyId": null,
            "symmetricKey": null,
            "uid": "9793b1b4-facc-4c6e-a66a-1b278d4beba1"
        },
        "signature": "q5Ne8UdMZKRVyK00A85Kk4ALT9TL0Ubur/Lgj3axOxwfNswyUK9qmzkFWdyNBQ0QUFB4mWkoWEMWRr8GIEx0cALO+BpCN1wBmQZmcQbNFcBQ3hGUg6LLtqxfidC3zbGyNhL5i1ckmo33s+MwGVOiEy/Rfy03CVgjQ98ej2qlujWuiHFYNiEe43is4ok0DLW4idzTh1bgd1Z/3A6Y9vM1osS332ZDVYJoaRLff324yhi7djADikEoUcF9AXcx57go0sRpWMj/+A4m605npS/i7cCoZZu7wfdrG5LB+oAWPaw7TefPGICO12C92kYmp0vO50BX+QbCUQ9MRlR8reBZBA==",
        "signatureKeyId": null
    }
    ),
    headers: {
        Accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJBMTRQN0UiLCJ0b2tlbklkIjoiYjEyNmI0NjctMTYyYy00MTA5LWFlMWQtOGQwNGEyNThiYmU3IiwiY3JlYXRlRGF0ZSI6MTY5MjM0ODA1MjY5MSwiY2xpZW50VHlwZSI6Ik1FTU9SWSIsInRheHBheWVySWQiOiIxMDIwMDMzODc3MCIsInN1YiI6IkExNFA3RSIsImV4cCI6MTY5MjM2MjQ1MiwiaXNzIjoiVEFYIE9yZ2FuaXphdGlvbiJ9.u7D6tBpqRnMY_0fq8_-j0T9gdhJpKFHd86f0v1sd5DuFMMQ1xoqtQCQoy1RNPbR54Ny1vaDsM35nx4t1-ep4EA",
        requestTraceId: "debbc439-07a1-1f9c-b123-611946562434",
        timestamp: 1692348054788,
        "Content-Type": "application/json; charset=utf-8"

    },
})
    // Parse JSON data
    .then(async (response) => {
        console.log(await response.json());

    }
    )
    .catch(err => console.log(err))