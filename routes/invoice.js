var express = require('express');

var router = express.Router({ mergeParams: true });

var middleware = require("../middleware");
var validation = require("../validation/invoice");

var _api = require("../utils/api_methods");


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
            inputs, invoices } = req.body;

        var init_validation = validation.send_invoice(inputs, invoices);
        if (!init_validation.status) {
            init_validation["code"] = 1;
            init_validation["data"] = {};
            return res.json(init_validation);
        }

        _api.get_token(inputs.client_id, function (token) {
            _api.send_invoice(token, invoices, inputs.client_id, function (response) {
                return res.json({ status: true, code: 0, data: response, message: 'send invoice success' });
            }, function (error) {
                return res.json({ status: false, code: 1, data: error, message: 'send invoice faided' });
            });
        },
            function (error) {
                return res.json({ status: false, code: 1, data: error, message: 'send invoice faided' });
            }
        );

    }
    catch (err) {
        console.log(err);
        return res.json({ status: false, data: {}, code: 500, message: err });
    }
});

module.exports = router;
