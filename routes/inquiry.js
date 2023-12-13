var express = require('express');

var router = express.Router({ mergeParams: true });

var middleware = require("../middleware");
var validation = require("../validation/invoice");

var _api = require("../utils/api_methods");

router.post("/inquiry_by_uid", middleware.action, async (req, res) => {
    try {

        const {
            inputs, invoices } = req.body;
        // console.log('len : '+invoices.length);

        var init_validation = validation.inquiry_by_uid(inputs, invoices);
        if (!init_validation.status) {
            init_validation["code"] = 1;
            init_validation["data"] = {};
            return res.json(init_validation);
        }

        _api.get_token(inputs.client_id, function (token) {
            _api.inquiry_by_uid(token.token, invoices, inputs.client_id, function (response) {
                return res.json({ status: true, code: 0, data: response, message: 'inquiry invoice success' });
            }, function (error) {
                console.log(error);
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

router.post("/inquiry_by_reference_number", middleware.action, async (req, res) => {
    try {

        const {
            inputs, invoices } = req.body;

        var init_validation = validation.INQUIRY_BY_REFERENCE_NUMBER(inputs, invoices);
        if (!init_validation.status) {
            init_validation["code"] = 1;
            init_validation["data"] = {};
            return res.json(init_validation);
        }

        _api.get_token(inputs.client_id, function (token, cookie) {
            _api.INQUIRY_BY_REFERENCE_NUMBER(token, invoices, inputs.client_id, function (response) {
                return res.json({ status: true, code: 0, data: response, message: 'inquiry invoice success' });
            }, function (error) {
                console.log(error);
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

router.post("/inquiry_by_time", middleware.action, async (req, res) => {
    try {

        const {
            inputs, data } = req.body;

        var init_validation = validation.INQUIRY_BY_TIME(inputs, data);
        if (!init_validation.status) {
            init_validation["code"] = 1;
            init_validation["data"] = {};
            return res.json(init_validation);
        }

        _api.get_token(inputs.client_id, function (token, cookie) {
            _api.INQUIRY_BY_TIME(token, data, inputs.client_id, function (response) {
                return res.json({ status: true, code: 0, data: response, message: 'inquiry invoice success' });
            }, function (error) {
                console.log(error);
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

router.post("/inquiry_by_time_range", middleware.action, async (req, res) => {
    try {

        const {
            inputs, data } = req.body;

        var init_validation = validation.INQUIRY_BY_TIME_RANGE(inputs, data);
        if (!init_validation.status) {
            init_validation["code"] = 1;
            init_validation["data"] = {};
            return res.json(init_validation);
        }

        _api.get_token(inputs.client_id, function (token, cookie) {
            _api.INQUIRY_BY_TIME_RANGE(token, data, inputs.client_id, function (response) {
                return res.json({ status: true, code: 0, data: response, message: 'inquiry invoice success' });
            }, function (error) {
                console.log(error);
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
