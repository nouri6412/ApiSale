var middlewareObj = {};

middlewareObj.get_token = function (client_id) {
    if (client_id) {
        return { status: true };
    }
    else {
        return { status: false, code: 2, message: ' حافظه مالیاتی معتبر نیست', data: {}, help: { client_id: '...' } };
    }
};

middlewareObj.GET_FISCAL_INFORMATION = function (client_id) {
    if (client_id) {
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
        return { status: false, code: 2, message: '  شماره اقتصادی معتبر نیست', data: {}, help: { client_id: '...' } };
    }
};

middlewareObj.send_invoice = function (inputs, invoices) {

    var status = true;
    var message = [];

    if (inputs) {
        if (inputs.client_id) {

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
                message[message.length] = { index: x, key: 'invoice.header', message: 'سربرگ صورتحساب معتبر نیست' };
            }

            if (invoice.body) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoice.body', message: 'بدنه صورتحساب معتبر نیست' };
            }

            if (invoice.payments) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoice.payments', message: 'پرداخت صورتحساب معتبر نیست' };
            }

            if (invoice.extension) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoice.extension', message: ' صورتحساب معتبر نیست' };
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
                message[message.length] = { index: x, key: 'fiscalId', message: ' حافظه مالیاتی معتبر نیست' };
            }

            if (invoice.uid) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'uid', message: ' شناسه صورت حساب معتبر نیست' };
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