
const axios = require('axios');
const fs = require('fs');

const crypto = require('crypto');

var timest = Date.now();
console.log(timest);
axios.post('https://tp.tax.gov.ir/req/api/self-tsp/sync/GET_TOKEN', {
    time: 1,
    packet: {
        uid: null,
        packetType: "GET_TOKEN",
        retry: false,
        data: { "username": "A1211P" },
        encryptionKeyId: "",
        symmetricKey: "",
        iv: "",
        fiscalId: "",
        dataSignature: ""
    },
    signature:`MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnr3BW13pLxmP+
    NQaxioyyr5IoVsekCOLXqOJAlGDKTlkVOUgSUzjKGybxWrQqMz6kDkjT/trPQxqD
    6HJDM9j+csZzhTcDy5zjFl5Akt5810Y9heCZYzicb16Pt6sDpwkbPO9BmL8jvuiU
    rGbyC9GwiwYiLasyJyI/Zk3HnQJx861NyZuLlxpGCUobi1qNVvhwsObgHSH/WxbD
    uydIBn6LjwVB5wXXPFZ0HbC3ddDAVHIIQew1i61m3H3goEJF/B59MFLNj5NO2D3k
    sL6ofR8PwxkrtbFyzwASLwt59CdIcHnmcUTDqxaC/+1LQk1vokgPw3bKCho6rMrF
    y9HLwFRjAgMBAAECggEBAKdrUVVTNEZdoM5Y8QLoGwv4oYvnANK1EI9Tjfn+axjx
    2p2HIH8zWhrnuxz0e7c6jMtNe8c1yA9xpxKWTSbtqDR8Mcl68u+2JkDQv2/nc33f
    jcC1XwamewotY5NIRNWTu1LXpuWudQBihmKSMwJtbIHAfHI5eJjNW7NDGFs5Vwyf
    KTc+Hb2QtyqKU/511l5CXOBsWzO3jUctBrlmzLr64GVsrNN4J+ENOS95ZyK/Odcf
    ENc8ta8yYRCJOGaXyQbrb4E4zaQJCJ5I+3OYmmrtVZNDwUB4CKLHwDqT+izi0Tbp
    WzkZesNOi+i3cqnPEx3I189DtUYZxeIpIT+lEmEqhQECgYEA25HLuJQnk0fVL2zd
    YBt2gEzFtmFK1PdL1hZnGppuQPlnDxqrJjEjzxkcNPbXnlJ/uLyKVRMZHhixPJHh
    C4S2t8Ei2yVYXuH2T57WD0jELEdmOi9cCv/MNDIUE52FA88TChGKg2TX4XkOyFN8
    718g1eV4PvwnL5UxhaxnRO9bDoECgYEAw4HdKtGp37ynPHh8V6VHa20EXgAOi0Zg
    BUX/87XE7Cwa1J6Y6rxZYTX1/YStuBZClYkGtQuTSzbbl1GKJskkGunjmfMssIqA
    PzvZmuz3BkGZUcpRO/VZ2eRqfxr8UCye/RJFvrn5kkIvaqSMJR27zw2PI5fyKsxb
    5hFiAdA2eOMCgYBiTFdD/y/og9QxMy+4gxL+RWCOUehKh5vv8H+gLVsGw6Eb5fiR
    VJaPdNJn88p8GrsLXX0gsTghfTR7xWNW4MdcZJ7SNVnmwIqhAp8aoJ0SpbRigClY
    00P8ah8K2Q5fsij37Ppx8IelbajsjlP0ZkYw/FZk/EYey1AsZA6nkfDWAQKBgDeg
    gKRJSZNOYysSgRaTAVIwj5iLXZgFKxb1BtF5+5DTL8MlaQ8JDklZiCddE+yX8NQJ
    S+5BX+R7tFlGqw9EFdDOkaLhDOsiTUEwr0ake9i823npHdn4gls74Y1OyVGqkIYj
    J9MPqVITINiv/uwknKZaDksrVY0V3mQEuCUZ8BXPAoGAeQJl0vDfgzQS5Jmwuwj6
    MYcDR/ROIhYcvIl9v80wHBaDIItb6XT4cM5YRJE6J9YbiV+QfAGf3tDahBO4Gcbx
    h7ey7Uks87zsLHiMnp9MnNVO+ND0IbHkOwgJBhT2IXZpWI6H5eZEVkn+lxSlxdes
    z0X/+sJExHYZLGoHGVpq9Ws=`

}, {
    headers: {
        'requestTraceId': timest,
        'timestamp': timest,
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
          console.log(error)
    })
    .finally(() => {

    });