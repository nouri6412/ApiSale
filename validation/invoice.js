var middlewareObj = {};

middlewareObj.get_token = function (client_id) {
    if (client_id) {
        try {
            const fs = require('fs');
            var pk = fs.readFileSync(`keys/${client_id}.key`, 'utf8');

        } catch (err) {
            return { status: false, code: 2, message: ' حافظه مالیاتی معتبر نیست', data: {}, help: { client_id: '...' } };
        }
        return { status: true };
    }
    else {
        return { status: false, code: 2, message: ' حافظه مالیاتی معتبر نیست', data: {}, help: { client_id: '...' } };
    }
};

middlewareObj.GET_FISCAL_INFORMATION = function (client_id) {
    if (client_id) {
        try {
            const fs = require('fs');
            var pk = fs.readFileSync(`keys/${client_id}.key`, 'utf8');

        } catch (err) {
            return { status: false, code: 2, message: ' حافظه مالیاتی معتبر نیست', data: {}, help: { client_id: '...' } };
        }
        return { status: true };
    }
    else {
        return { status: false, code: 2, message: ' حافظه مالیاتی معتبر نیست', data: {}, help: { client_id: '...' } };
    }
};

middlewareObj.GET_ECONOMIC_CODE_INFORMATION = function (economicCode) {
    if (economicCode) {
        return { status: true };
    }
    else {
        return { status: false, code: 2, message: '  شماره اقتصادی معتبر نیست', data: {}, help: { economicCode: '...' } };
    }
};

middlewareObj.send_invoice = function (inputs, invoices) {

    var status = true;
    var message = [];

    if (inputs) {
        if (inputs.client_id) {
            try {
                const fs = require('fs');
                var pk = fs.readFileSync(`keys/${inputs.client_id}.key`, 'utf8');

            } catch (err) {
                status = false;
                message[message.length] = { key: 'client_id', message: ' حافظه مالیاتی معتبر نیست' };
            }
        }
        else {
            status = false;
            message[message.length] = { key: 'client_id', message: ' حافظه مالیاتی معتبر نیست' };
        }
    }
    else {
        status = false;
        message[message.length] = { key: 'inputs', message: 'پارامترهای ورودی معتبر نیست' };
    }

    if (invoices) {
        for (var x = 0; x < invoices.length; x++) {
            var invoice = invoices[x];
            if (invoice.header) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoices[x].header', message: 'سربرگ صورتحساب معتبر نیست' };
            }

            if (invoice.body) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoices[x].body', message: 'بدنه صورتحساب معتبر نیست' };
            }

            if (invoice.payments) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoices[x].payments', message: 'پرداخت صورتحساب معتبر نیست' };
            }

            if (invoice.extension) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoices[x].extension', message: 'extension صورتحساب معتبر نیست' };
            }
        }
    }
    else {
        status = false;
        message[message.length] = { key: 'invoices', message: '  صورتحساب معتبر نیست' };
    }

    return { status: status, message: message, help: { client_id: '...', invoices: [{ header: {}, body: [{}, {}], payments: [{}, {}], extension: null }, { header: {}, body: [{}, {}], payments: [{}, {}], extension: null }] } };
};

middlewareObj.inquiry_by_uid = function (inputs, invoices) {

    var status = true;
    var message = [];

    if (inputs) {
        if (inputs.client_id) {
            try {
                const fs = require('fs');
                var pk = fs.readFileSync(`keys/${inputs.client_id}.key`, 'utf8');

            } catch (err) {
                status = false;
                message[message.length] = { key: 'client_id', message: ' حافظه مالیاتی معتبر نیست' };
            }
        }
        else {
            status = false;
            message[message.length] = { key: 'client_id', message: ' حافظه مالیاتی معتبر نیست' };
        }
    }
    else {
        status = false;
        message[message.length] = { key: 'inputs', message: 'پارامترهای ورودی معتبر نیست' };
    }
    if (invoices) {
        for (var x = 0; x < invoices.length; x++) {
            var invoice = invoices[x];
            if (invoice.fiscalId) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoices[x].fiscalId', message: ' حافظه مالیاتی معتبر نیست' };
            }

            if (invoice.uid) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoices[x].uid', message: ' شناسه صورت حساب معتبر نیست' };
            }

        }
    }
    else {
        status = false;
        message[message.length] = { key: 'invoices', message: '  اطلاعات صورتحساب ها معتبر نیست' };
    }

    return {
        status: status, message: message, help: {
            client_id: '...', invoices: [{
                "fiscalId": "...",
                "uid": ".."
            }, {
                "fiscalId": "...",
                "uid": ".."
            }]
        }
    };
};

module.exports = middlewareObj;