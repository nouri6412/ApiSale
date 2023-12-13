const fs = require('fs');
var _api = require("./utils/api_methods");

var invoice_inquiry = [
  {
    "fiscalId": "A14P7E",
    "uid": "320c28c1-8a96-4e1a-9608-23fb1d613370"
  }
  
];
var key_file=`-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDcN9rMbDlE9ePm
SNQsrDspU+HvTp264Y8CHINbHsYI37KqCLJFVYxhuVNQ/Sp0fQsf4CdF/5LE+iMS
WnWwU/e2/8hrbYI0dDQNmM8/45HgykTWbXfSPsDO3QG76TypiOlPfhqpv475mSNQ
4qzxJKTvVl+MCCW3+OMWujqBaT33aHdRzW/MHPWWuxcXhwJ7ZPYK+OMlAcGIkAjs
4XDd9hiStzNOlpmqe+bBQsE1oL+t0R3I2b8hYmSbkx1zsH/9eMNz7Bh9pL/+LYsV
BvtaluCP02ZPLf03BDs6AUnCxzD1aJqOgjlpaBPOi1CZkn4WV8Lw1eMfQuIQllyY
aWVjAwwzAgMBAAECggEAUSHe4WuJ2edBlGkGioLVtQ8rcTAkmmJZfqyklGCNE13f
BBf6HeM7uhE+Kdtr1cjv3UmHDpnvJ9UEMNHVBCabX/dyjmmlC9A4ET5YNLCR4SCE
Jf/kojfubwgriGCQseE4G8pY5mslsL2Drlwk3R7kCS1oPD4QL2xptcjcnyr34nsS
be2DhEIFVxm4bGAnNNFc+6oIHzFhZsyN5al8+uhJ6U65eHjf6FoLQeTMnTzHoO+Z
qQpDCyhi2HxQl5DCbwPJpRVLOoqUqKrmgpFUwcSdlN0OF2S9x5OIL1QOH6/vSKgo
r4XsNe/ylXh9kCzvpXf7b6t1CUaciu1gflfsON6v4QKBgQDuowCKxhVgOasX+GrH
0/QRcF2GZunrxUiWn5FfKo1dFyD0HwpE5baAXPrdULXviZj8h2kkC73KzfuYNYXz
NsYpBxezB0Whunz+JurNeFcFq0w5/Av/8nHjkLOQfkFiET9x30/nj0/74s/jhvjk
h+OUmw5jU33Xy1EC776IWP5yYwKBgQDsPcbz08R+kQ6aIXKEgGVpl5h4VAI4eKBn
1b45M7KlIwGGwFK5HrPzxH+32b+ek8nAG5Qqgx73KRHJ+GBIsEgKPdmkLbbB3Cui
YoSO+Ig8QFm4YWUiQcpbyYhyXul2X9ibdgKfFTO1LJ6LUJlInKIqX5Z8iH/3TrKN
eg3PxFE/8QKBgQCWPd/AfzfEDmquu8MWrlYSiKkJTk/mFZ4+3pWa0eKQglhH+ibv
+6QsKt3yarcw6XN9Qg+rFw1V2tuVF9WOq6SU/hcoquJnEU9Sf9QCqso3EoL6Wrp/
WPflKxwyU5r8kBleqxbWlf7oegMin76huwBIdlrXpCAttZ76d1CA7W69OwKBgQCv
lq80dZcb16c5ylh6wZAe7q1F6nMIFChtZQIRNCq48Q7mYDZcH8TzD386YF87d29C
GX2EJ5cxb9Yn/zNZc6Tn79a/X7bx2jqYZI9QUMu5tL66+7EWyD2nAWEoWQE/mbe+
vPTv1utq4vIobEyyGrGxuwB4KWCrqVOvMiPn5GvbkQKBgHcAdJ/9LbrT0ngqVilK
x+d75BEQ6+aHnNubVJQjzP7nGrol2QyoR78/CQ+awH+vWaT9PtWITFAeV4uumU3n
4BjzsvYlFbPUjmynBR5JE3nt+w6raeLigY/p5OV3F31BquLBhnXHloin6696i2tG
DtCC+zRLnlsMG0XmzuESg4lP
-----END PRIVATE KEY-----
`;

var client_id="A14P7E";
var w= fs.writeFileSync(`keys/${client_id}.key`, key_file);

_api.get_token(client_id, function (token) {
  console.log(token);
  //console.log('token is '+ token);
  // _api.inquiry_by_uid(token.token, invoice_inquiry, "A14P7E", function (response) {
  //   console.log(response.data[0].data);
  // }, function (error) {
  //   console.log(error);
  // });

  // _api.send_invoice(token, invoice_data, "A14P7E", function (response) {
  //   console.log(response);
  // }, function (error) {
  //   console.log(error);
  // });
},
  function (error) {
    console.log(error);
  }
);
return;
_api.get_serveer_information( function (response) {
  console.log(response);
}, function (error) {
  console.log(error);
});
return;

// var invoice_data = [{ "Body": [{ "Sstid": "123", "Sstt": null, "Mu": "1627", "Am": 1.0, "Fee": 500.0, "Cfee": null, "Cut": "IRR", "Exr": 1.0, "Prdis": 500.0, "Dis": 0.0, "Adis": 500.0, "Vra": 0.0, "Vam": 0.0, "Odt": "", "Odr": 0.0, "Odam": 0.0, "Olt": "", "Olr": 0.0, "Olam": 0.0, "Consfee": null, "Spro": null, "Bros": null, "Tcpbs": null, "Cop": 0.0, "Vop": 0.0, "Bsrn": "0", "Tsstam": 500.0, "Nw": null, "Ssrv": null, "Sscv": null }], "Header": { "Taxid": "A14P7E04C9D0016B101A60", "Indatim": 1694579034000, "Indati2m": 1694579034206, "Inty": 1, "Inno": "100000000001", "Irtaxid": null, "Inp": 1, "Ins": 1, "Tins": "", "Tob": 1, "Bid": "1", "Tinb": "1", "Sbc": "1", "Bpc": "1", "Bbc": null, "Ft": null, "Bpn": null, "Scln": "0", "Scc": null, "Crn": "0", "Billid": null, "Tprdis": 500.0, "Tdis": 0.0, "Tadis": 500.0, "Tvam": 0.0, "Todam": 0.0, "Tbill": 500.0, "Setm": 1, "Cap": 500.0, "Insp": null, "Tvop": 0.0, "Tax17": 0.0, "Cdcn": null, "Cdcd": null, "Tonw": null, "Torv": null, "Tocv": null }, "Payments": [], "Extension": null }];
// // invoice_data[invoice_data.length]={ "Body": [{ "Sstid": "123", "Sstt": null, "Mu": "1627", "Am": 1.0, "Fee": 500.0, "Cfee": null, "Cut": "IRR", "Exr": 1.0, "Prdis": 500.0, "Dis": 0.0, "Adis": 500.0, "Vra": 0.0, "Vam": 0.0, "Odt": "", "Odr": 0.0, "Odam": 0.0, "Olt": "", "Olr": 0.0, "Olam": 0.0, "Consfee": null, "Spro": null, "Bros": null, "Tcpbs": null, "Cop": 0.0, "Vop": 0.0, "Bsrn": "0", "Tsstam": 500.0, "Nw": null, "Ssrv": null, "Sscv": null }], "Header": { "Taxid": "A14P7E04C9D0016B101A61", "Indatim": 1694579034000, "Indati2m": 1694579034206, "Inty": 1, "Inno": "100000000002", "Irtaxid": null, "Inp": 1, "Ins": 1, "Tins": "", "Tob": 1, "Bid": "1", "Tinb": "1", "Sbc": "1", "Bpc": "1", "Bbc": null, "Ft": null, "Bpn": null, "Scln": "0", "Scc": null, "Crn": "0", "Billid": null, "Tprdis": 500.0, "Tdis": 0.0, "Tadis": 500.0, "Tvam": 0.0, "Todam": 0.0, "Tbill": 500.0, "Setm": 1, "Cap": 500.0, "Insp": null, "Tvop": 0.0, "Tax17": 0.0, "Cdcn": null, "Cdcd": null, "Tonw": null, "Torv": null, "Tocv": null }, "Payments": [], "Extension": null };
// let PublicKey = {};
// _api.get_serveer_information(function (response) {
//   //console.log(response);
//   PublicKey = response.publicKeys[0];
//   _api.get_token("A14P7E", function (token, cookie) {
//     //console.log('token is '+ token);
//     // _api.inquiry_by_uid(token, invoice_inquiry, "A14P7E", function (response) {
//     //   console.log(response.data[0].data.error);
//     //   // console.log(response.data[0].data.error);
//     // }, function (error) {
//     //   console.log(error);
//     // });
//     _api.send_invoice_v1(token, invoice_data, "A14P7E", PublicKey, function (response) {

//       console.log(response);
//       invoice_inquiry = [
//         {
//           "fiscalId": "A14P7E",
//           "uid": response.result[0].uid
//         }
//       ];
//       _api.inquiry_by_uid(token, invoice_inquiry, "A14P7E", function (response) {
//         console.log(response.data[0]);
//         if(response.data[0].data)
//         {
//           if(response.data[0].data.error)
//           {
//             console.log(response.data[0].data.error);
//           }
//         }
//       }, function (error) {
//         console.log(error);
//       });
//     }, function (error) {
//       console.log(error);
//     });
//   },
//     function (error) {
//       console.log(error);
//     }
//   );
// }, function (error) {
//   console.log(error);
// });



// _api.inquiry_by_uid("", invoice_inquiry, "A14P7E", function (response) {
//   console.log(response);
// }, function (error) {
//   console.log(error);
// });
// return;

// _api.enc(function (response) {
//   console.log(response);
// }, function (error) {
//   console.log(error);
// });
// var token_1="eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJBMTRQN0UiLCJ0b2tlbklkIjoiYjEyNmI0NjctMTYyYy00MTA5LWFlMWQtOGQwNGEyNThiYmU3IiwiY3JlYXRlRGF0ZSI6MTY5MjM0ODA1MjY5MSwiY2xpZW50VHlwZSI6Ik1FTU9SWSIsInRheHBheWVySWQiOiIxMDIwMDMzODc3MCIsInN1YiI6IkExNFA3RSIsImV4cCI6MTY5MjM2MjQ1MiwiaXNzIjoiVEFYIE9yZ2FuaXphdGlvbiJ9.u7D6tBpqRnMY_0fq8_-j0T9gdhJpKFHd86f0v1sd5DuFMMQ1xoqtQCQoy1RNPbR54Ny1vaDsM35nx4t1-ep4EA";
// _api.inquiry_by_uid(token_1, invoice_inquiry, "A14P7E", function (response) {
//   console.log(response);
// }, function (error) {
//   console.log(error);
// });
// return;



// "500.0#1.0###0#####0.0#IRR#0.0#1.0#500.0#1627###0.0#0.0###0.0#0.0###500.0#######123#####500.0#0.0#0.0#0.0#####1###1###500.0#####0###1692420004224#1692420004000#12345604#1#1###1###1###0#1#500.0#0.0#A14P7E04C84002B681C064#500.0#0.0#1###1###0.0#####500.0#0.0#0.0#"
// "500.0#1.0###0#####0.0#IRR#0.0#1.0#500.0#1627###0.0#0.0###0.0#0.0###500.0#######123#####500.0#0.0#0.0#0.0#####1###1###500.0#####0###1692420004224#1692420004000#12345604#1#1###1###1###0#1#500.0#0.0#A14P7E04C84002B681C064#500.0#0.0#1###1###0.0#####500.0#0.0#0.0"