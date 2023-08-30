var _api = require("./utils/api_methods");

var invoice_inquiry = [
  {
    "fiscalId": "A14P7E",
    "uid": "2eaa002d-4c5e-4b9e-a04f-90585315d569"
  }
];
// _api.get_token("A14P7E", function (token, cookie) {
//   //console.log('token is '+ token);
//   _api.inquiry_by_uid(token, invoice_inquiry, "A14P7E", function (response) {
//     console.log(response.data.result.data);
//   }, function (error) {
//     console.log(error);
//   });

//   // _api.send_invoice(token, invoice_data, "A14P7E", function (response) {
//   //   console.log(response);
//   // }, function (error) {
//   //   console.log(error);
//   // });
// },
//   function (error) {
//     console.log(error);
//   }
// );
// return;
// _api.get_serveer_information( function (response) {
//   console.log(response);
// }, function (error) {
//   console.log(error);
// });
// return;

var invoice_data = [{
  "Header": {
    "Taxid": "A14P7E04C84002B681C064",
    "Indatim": 1692420004000,
    "Indati2m": 1692420004224,
    "Inty": 1,
    "Inno": "100000000001",
    "Irtaxid": null,
    "Inp": 1,
    "Ins": 1,
    "Tins": "",
    "Tob": 1,
    "Bid": "1",
    "Tinb": "1",
    "Sbc": "1",
    "Bpc": "1",
    "Bbc": null,
    "Ft": null,
    "Bpn": null,
    "Scln": "1",
    "Scc": null,
    "Crn": "1",
    "Billid": null,
    "Tprdis": 500,
    "Tdis": 0,
    "Tadis": 500,
    "Tvam": 0,
    "Todam": 0,
    "Tbill": 0,
    "Setm": 1,
    "Cap": 500,
    "Insp": null,
    "Tvop": 0,
    "Tax17": 0,
    "Cdcn": null,
    "Cdcd": null,
    "Tonw": null,
    "Torv": null,
    "Tocv": null
  },
  "Body": [
    {
      "Sstid": "123",
      "Sstt": null,
      "Mu": "1627",
      "Am": 1,
      "Fee": 500.0,
      "Cfee": null,
      "Cut": "IRR",
      "Exr": 1,
      "Prdis": 500.0,
      "Dis": 0,
      "Adis": 500,
      "Vra": 0,
      "Vam": 0,
      "Odt": "",
      "Odr": 0,
      "Odam": 0,
      "Olt": "",
      "Olr": 0,
      "Olam": 0,
      "Consfee": null,
      "Spro": null,
      "Bros": null,
      "Tcpbs": null,
      "Cop": 0,
      "Vop": 0,
      "Bsrn": "0",
      "Tsstam": 500,
      "Nw": null,
      "Ssrv": null,
      "Sscv": null
    }
  ],
  "Payments": [],
  "Extension": null
}];

let PublicKey = {};
_api.get_serveer_information(function (response) {
  //console.log(response);
  PublicKey = response.publicKeys[0];
  _api.get_token("A14P7E", function (token, cookie) {
    //console.log('token is '+ token);
    // _api.inquiry_by_uid(token, invoice_inquiry, "A14P7E", function (response) {
    //   console.log(response.data[0].data.error);
    // }, function (error) {
    //   console.log(error);
    // });

    _api.send_invoice_v1(token, invoice_data, "A14P7E", PublicKey, function (response) {

      console.log(response);
      invoice_inquiry = [
        {
          "fiscalId": "A14P7E",
          "uid": response.result[0].uid
        }
      ];
      _api.inquiry_by_uid(token, invoice_inquiry, "A14P7E", function (response) {
        console.log(response.data[0].data.error);
      }, function (error) {
        console.log(error);
      });
    }, function (error) {
      console.log(error);
    });
  },
    function (error) {
      console.log(error);
    }
  );
}, function (error) {
  console.log(error);
});



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