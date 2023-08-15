var _api = require("./utils/api_methods");
var invoice_data = { "Header": { "Taxid": "A14P7E04C7F001B2BBB3D3", "Indatim": 1691989628000, "Indati2m": 1691989628723, "Inty": 1, "Inno": "123333", "Irtaxid": null, "Inp": 1, "Ins": 1, "Tins": "", "Tob": 1, "Bid": "1", "Tinb": "1", "Sbc": "1", "Bpc": "1", "Bbc": null, "Ft": null, "Bpn": null, "Scln": "0", "Scc": null, "Crn": "0", "Billid": null, "Tprdis": 5000.0, "Tdis": 0.0, "Tadis": 5000.0, "Tvam": 0.0, "Todam": 0.0, "Tbill": 5000.0, "Setm": 1, "Cap": 5000.0, "Insp": null, "Tvop": 0.0, "Tax17": 0.0, "Cdcn": null, "Cdcd": null, "Tonw": null, "Torv": null, "Tocv": null }, "Body": [{ "Sstid": "123", "Sstt": null, "Mu": "1627", "Am": 1.0, "Fee": 5000.0, "Cfee": null, "Cut": "IRR", "Exr": 1.0, "Prdis": 5000.0, "Dis": 0.0, "Adis": 5000.0, "Vra": 0.0, "Vam": 0.0, "Odt": "", "Odr": 0.0, "Odam": 0.0, "Olt": "", "Olr": 0.0, "Olam": 0.0, "Consfee": null, "Spro": null, "Bros": null, "Tcpbs": null, "Cop": 0.0, "Vop": 0.0, "Bsrn": "0", "Tsstam": 5000.0, "Nw": null, "Ssrv": null, "Sscv": null }], "Payments": [], "Extension": null };

var invoice_inquiry=[
  {
     "fiscalId" : "A14P7E",
     "uid" : "faa5e78e-e257-4bca-9efe-6cd8247be460"
  }
];

_api.get_token("A14P7E", function (token) {
  console.log('token is :' + token);

  _api.inquiry_by_uid(token, invoice_inquiry, "A14P7E", function (response) {
    console.log(response);
  }, function (error) {
    console.log(error);
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
