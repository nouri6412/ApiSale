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

router.post("/get_server_information", middleware.action, async (req, res) => {
    try {
        _api.get_serveer_information(function (response) {
            return res.json({ status: true, code: 0, data: response, message: 'success' });
        }, function (error) {
            return res.json({ status: false, code: 1, data: error, message: 'faided' });
        });
    }
    catch (err) {
        console.log(err);
        return res.json({ status: false, data: {}, code: 500, message: err });
    }
});

router.post("/get_token", middleware.action, async (req, res) => {
    try {

        const {
            client_id } = req.body;

        var token_validation = validation.get_token(client_id);
        if (!token_validation.status) {
            return res.json(token_validation);
        }

        _api.get_token(client_id, function (response) {
            return res.json({ status: true, code: 0, data: { token: response }, message: 'get token success' });
        }, function (error) {
            return res.json({ status: false, code: 1, data: error, message: 'get token faided' });
        });

    }
    catch (err) {
        console.log(err);
        return res.json({ status: false, data: {}, code: 500, message: err });
    }
});

router.post("/get_fiscal_information", middleware.action, async (req, res) => {
    try {

        const {
            client_id } = req.body;

        var GET_FISCAL_INFORMATION = validation.GET_FISCAL_INFORMATION(client_id);
        if (!GET_FISCAL_INFORMATION.status) {
            return res.json(GET_FISCAL_INFORMATION);
        }

        _api.GET_FISCAL_INFORMATION(client_id, function (response) {
            return res.json({ status: true, code: 0, data: { token: response }, message: ' GET_FISCAL_INFORMATION success' });
        }, function (error) {
            return res.json({ status: false, code: 1, data: error, message: 'GET_FISCAL_INFORMATION faided' });
        });

    }
    catch (err) {
        console.log(err);
        return res.json({ status: false, data: {}, code: 500, message: err });
    }
});

router.post("/GET_ECONOMIC_CODE_INFORMATION", middleware.action, async (req, res) => {
    try {

        const {
            economicCode } = req.body;

        var GET_ECONOMIC_CODE_INFORMATION = validation.GET_ECONOMIC_CODE_INFORMATION(economicCode);
        if (!GET_ECONOMIC_CODE_INFORMATION.status) {
            return res.json(GET_ECONOMIC_CODE_INFORMATION);
        }

        _api.GET_ECONOMIC_CODE_INFORMATION(economicCode, function (response) {
            return res.json({ status: true, code: 0, data: { token: response }, message: ' GET_ECONOMIC_CODE_INFORMATION success' });
        }, function (error) {
            return res.json({ status: false, code: 1, data: error, message: 'GET_ECONOMIC_CODE_INFORMATION faided' });
        });

    }
    catch (err) {
        console.log(err);
        return res.json({ status: false, data: {}, code: 500, message: err });
    }
});

router.post("/send_invoice", middleware.action, async (req, res) => {
    try {

        const {
            inputs, invoices } = req.body;

        var init_validation = validation.send_invoice(inputs, invoices);
        if (!init_validation.status) {
            init_validation["code"] = 1;
            init_validation["date"] = {};
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
                return res.json({ status: false, code: 1, data: error, message: 'token faided' });
            }
        );

    }
    catch (err) {
        console.log(err);
        return res.json({ status: false, data: {}, code: 500, message: err });
    }
});

router.post("/inquiry_by_uid", middleware.action, async (req, res) => {
    try {

        const {
            inputs, invoices } = req.body;

        var init_validation = validation.inquiry_by_uid(inputs, invoices);
        if (!init_validation.status) {
            init_validation["code"] = 1;
            init_validation["date"] = {};
            return res.json(init_validation);
        }

        _api.get_token(inputs.client_id, function (token) {
            _api.inquiry_by_uid(token, invoices, inputs.client_id, function (response) {
                return res.json({ status: true, code: 0, data: response, message: 'inquiry invoice success' });
            }, function (error) {
                return res.json({ status: false, code: 1, data: error, message: 'inquiry invoice faided' });
            });
        },
            function (error) {
                return res.json({ status: false, code: 1, data: error, message: 'token faided' });
            }
        );

    }
    catch (err) {
        console.log(err);
        return res.json({ status: false, data: {}, code: 500, message: err });
    }
});

module.exports = router;
