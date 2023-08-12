var express = require('express');
const axios = require('axios');
const config = require('../config');

var router = express.Router({ mergeParams: true });

var middleware = require("../middleware");
var validation = require("../validation/invoice");


var aes256gcm = require("../utils/aes-gcm");

var pubk = require("../utils/pubk");

var api = require("../utils/api_methods");

var signatory = require("../utils/signatory");

router.get("/", middleware.action, async (req, res) => {
    return res.json({
        methods: [
            {
                method: 'send_invoice',
                description: 'تابع ارسال صورتحساب',
                type: 'post'
            }
        ]
    });
});

router.post("/send_invoice", middleware.action, async (req, res) => {
    try {

        const {
            init_params, invoice } = req.body;

        var init_validation = validation.init(init_params, invoice);
        // if (!init_validation.status) {
        //     return res.json(init_validation);
        // }

        var str = await signatory.signatory(init_params, invoice);

        var da = await aes256gcm.aes256gcm().init(str);
        //console.log(da);
        let encd = '';
       await api.enc(async response => {
            if (response.data.result) {
                if (response.data.result.data) {
                    if (response.data.result.data.publicKeys) {
                        try {

                            encd = await pubk.pubk().publicEncrypt(response.data.result.data.publicKeys[0].key, da.key);

                        } catch (error) {
                            console.error(error);
                        }

                    }
                }
            }
        });

        console.log(encd.toString('base64'));

        return res.json({ status: true, data: { init_params: init_params, invoice: invoice } });
    }
    catch (err) {
        console.log(err);
        return res.json({ status: false, message: 'error in compile' });
    }
});

module.exports = router;
