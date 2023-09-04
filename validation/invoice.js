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
            if (invoice.Header) {
                if (!invoice.Header.Inty) {
                    status = false;
                    message[message.length] = { index: x, key: 'invoices[x].Header.Inty', message: 'نوع صورتحساب معتبر نیست' };
                }
                else
                {
                    if (invoice.Header.Inty==1) 
                    {
                        if (!invoice.Header.Tob) {
                            status = false;
                            message[message.length] = { index: x, key: 'invoices[x].Header.Tob', message: ' نوع شخص خریدار معتبر نیست' };
                        }
                        if (!invoice.Header.Bid) {
                            status = false;
                            message[message.length] = { index: x, key: 'invoices[x].Header.Bid', message: '   شماره/شناسه ملی معتبر نیست' };
                        }
                        if (!invoice.Header.Tinb) {
                            status = false;
                            message[message.length] = { index: x, key: 'invoices[x].Header.Tinb', message: 'شماره اقتصادی خریدار معتبر نست' };
                        }
                    }
                }
                if (!invoice.Header.Inp) {
                    status = false;
                    message[message.length] = { index: x, key: 'invoices[x].Header.Inp', message: 'الگوی صورتحساب معتبر نیست' };
                }
                if (!invoice.Header.Taxid) {
                    status = false;
                    message[message.length] = { index: x, key: 'invoices[x].Header.Taxid', message: ' شماره منحصر به فرد مالیاتی معتبر نیست' };
                }
                if (!invoice.Header.Indati2m) {
                    status = false;
                    message[message.length] = { index: x, key: 'invoices[x].Header.Indati2m', message: 'تاریخ ایجاد صورتحساب معتبر نیست' };
                }
                if (!invoice.Header.Indatim) {
                    status = false;
                    message[message.length] = { index: x, key: 'invoices[x].Header.Indatim', message: 'تاریخ صدور صورتحساب معتبر نیست' };
                }
                if (!invoice.Header.Ins) {
                    status = false;
                    message[message.length] = { index: x, key: 'invoices[x].Header.Ins', message: ' موضوع صورتحساب معتبر نیست' };
                }
                if (!invoice.Header.Inno) {
                    status = false;
                    message[message.length] = { index: x, key: 'invoices[x].Header.Inno', message: ' سریال داخلی صورتحساب معتبر نیست' };
                }
                if (!invoice.Header.Setm) {
                    status = false;
                    message[message.length] = { index: x, key: 'invoices[x].Header.Setm', message: '  روش تسویه صورتحساب معتبر نیست' };
                }

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoices[x].Header', message: 'سربرگ صورتحساب معتبر نیست' };
            }

            if (invoice.Body) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoices[x].Body', message: 'بدنه صورتحساب معتبر نیست' };
            }

            if (invoice.Payments) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoices[x].Payments', message: 'پرداخت صورتحساب معتبر نیست' };
            }

            if (invoice.Extension || invoice.Extension == null) {

            }
            else {
                status = false;
                message[message.length] = { index: x, key: 'invoices[x].Extension', message: 'Extension صورتحساب معتبر نیست' };
            }
        }
    }
    else {
        status = false;
        message[message.length] = { key: 'invoices', message: '  صورتحساب معتبر نیست' };
    }

    return { status: status, message: message, help: { client_id: '...', invoices: [{ Header: {}, Body: [{}, {}], Payments: [{}, {}], Extension: null }, { Header: {}, Body: [{}, {}], Payments: [{}, {}], Extension: null }] } };
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

middlewareObj.INQUIRY_BY_REFERENCE_NUMBER = function (inputs, invoices) {

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
        if (invoices.referenceNumber) {
            if (invoices.referenceNumber.length == 0) {
                status = false;
                message[message.length] = { key: 'invoices.referenceNumber', message: '  اطلاعات صورتحساب ها معتبر نیست' };
            }
        }
        else {
            status = false;
            message[message.length] = { key: 'invoices.referenceNumber', message: '  اطلاعات صورتحساب ها معتبر نیست' };
        }

    }
    else {
        status = false;
        message[message.length] = { key: 'invoices', message: '  اطلاعات صورتحساب ها معتبر نیست' };
    }

    return {
        status: status, message: message, help: {
            client_id: '...', invoices: { referenceNumber: ['#######', '#######'] }
        }
    };
};

middlewareObj.INQUIRY_BY_TIME = function (inputs, data) {

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
    if (data) {
        if (data.time) {

        }
        else {
            status = false;
            message[message.length] = { key: 'data.time', message: 'زمان ورودی معتبر نیست' };
        }

    }
    else {
        status = false;
        message[message.length] = { key: 'data', message: '  اطلاعات صورتحساب ها معتبر نیست' };
    }

    return {
        status: status, message: message, help: {
            client_id: '...', data: { time: 14020202 }
        }
    };
};

middlewareObj.INQUIRY_BY_TIME_RANGE = function (inputs, data) {

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
    if (data) {
        if (data.startDate && data.endDate) {

        }
        else {
            status = false;
            message[message.length] = { key: 'data.time', message: 'بازه زمان ورودی معتبر نیست' };
        }

    }
    else {
        status = false;
        message[message.length] = { key: 'data', message: '  اطلاعات صورتحساب ها معتبر نیست' };
    }

    return {
        status: status, message: message, help: {
            client_id: '...', data: {
                startDate:
                    14010321,
                endDate:
                    14010324
            }
        }
    };
};

module.exports = middlewareObj;