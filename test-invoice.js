var _api = require("./utils/api_methods-back");
var invoice_data = { "Header": { "Taxid": "A14P7E04C7F001B2BBB3D3", "Indatim": 1691989628000, "Indati2m": 1691989628723, "Inty": 1, "Inno": "123333", "Irtaxid": null, "Inp": 1, "Ins": 1, "Tins": "", "Tob": 1, "Bid": "1", "Tinb": "1", "Sbc": "1", "Bpc": "1", "Bbc": null, "Ft": null, "Bpn": null, "Scln": "0", "Scc": null, "Crn": "0", "Billid": null, "Tprdis": 5000.0, "Tdis": 0.0, "Tadis": 5000.0, "Tvam": 0.0, "Todam": 0.0, "Tbill": 5000.0, "Setm": 1, "Cap": 5000.0, "Insp": null, "Tvop": 0.0, "Tax17": 0.0, "Cdcn": null, "Cdcd": null, "Tonw": null, "Torv": null, "Tocv": null }, "Body": [{ "Sstid": "123", "Sstt": null, "Mu": "1627", "Am": 1.0, "Fee": 5000.0, "Cfee": null, "Cut": "IRR", "Exr": 1.0, "Prdis": 5000.0, "Dis": 0.0, "Adis": 5000.0, "Vra": 0.0, "Vam": 0.0, "Odt": "", "Odr": 0.0, "Odam": 0.0, "Olt": "", "Olr": 0.0, "Olam": 0.0, "Consfee": null, "Spro": null, "Bros": null, "Tcpbs": null, "Cop": 0.0, "Vop": 0.0, "Bsrn": "0", "Tsstam": 5000.0, "Nw": null, "Ssrv": null, "Sscv": null }], "Payments": [], "Extension": null };

var invoice_inquiry = [
  {
    "fiscalId": "A14P7E",
    "uid": "55029617-eb6e-47af-b357-58c57a247202"
  }
];

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
_api.get_token("A14P7E", function (token) {
  console.log( token);

  _api.inquiry_by_uid(token, invoice_inquiry, "A14P7E", function (response) {
    console.log(response);
  }, function (error) {
    //console.log(error);
  });

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

// "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJBMTRQN0UiLCJ0b2tlbklkIjoiMWE4MzM2ODUtNDY0Yi00OTMyLWI0ZWEtMzFhODMwMjRiM2FlIiwiY3JlYXRlRGF0ZSI6MTY5MjE2ODM4MzU3OSwiY2xpZW50VHlwZSI6Ik1FTU9SWSIsInRheHBheWVySWQiOiIxMDIwMDMzODc3MCIsInN1YiI6IkExNFA3RSIsImV4cCI6MTY5MjE4Mjc4MywiaXNzIjoiVEFYIE9yZ2FuaXphdGlvbiJ9.YZZkvC5nxoxJn8eLG8lOGA8Yi49_iOgC1bkdnaFbGNUAjtb7t03wsItS1V6xziw3SpeTB32IjL4sHTbGcGJmVQ#A14P7E#accc15a6-e437-4254-bb25-8b757ebf6924#####A14P7E###INQUIRY_BY_UID#18fb5514-5d74-407b-a508-df0a52c7c3e9#false###1692168393327#e5eeffde-6136-4167-8555-58a1e74fd066#"
// "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJBMTRQN0UiLCJ0b2tlbklkIjoiMjNmMjU4MTYtZWQyYi00NjdhLWJkYzUtOTc0NGM4YzE0OGMzIiwiY3JlYXRlRGF0ZSI6MTY5MjE3MDY4MTEzNCwiY2xpZW50VHlwZSI6Ik1FTU9SWSIsInRheHBheWVySWQiOiIxMDIwMDMzODc3MCIsInN1YiI6IkExNFA3RSIsImV4cCI6MTY5MjE4NTA4MSwiaXNzIjoiVEFYIE9yZ2FuaXphdGlvbiJ9.N8Su0BZlnJDL7UgiWxIq9jSNcUMgpxzlEVHuiH_aNLi9Mq8GSPXKTR41v29EHJHpQSJdFxkaY3AsJJJk7n8gIQ#A14P7E#e10cfbeb-101a-4808-b960-f79d85d6f8d2#####A14P7E###INQUIRY_BY_UID#44f015b3-15c1-48c7-9010-e7ced690f5df#false###1692170681324#a3130ef1-771b-4a7e-9b4c-ba451c244a6d#"