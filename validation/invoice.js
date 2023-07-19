var middlewareObj = {};

middlewareObj.init = function (init_params, invoice) {

    var status = true;
    var message = [];

    if (init_params) {
        if (init_params.client_id) {

        }
        else {
            status=false;
            message[message.length] = { key: 'client_id', message: ' حافظه مالیاتی معتبر نیست' };
        }

        if (init_params.private_key) {

        }
        else {
            status=false;
            message[message.length] = { key: 'private_key', message: 'کلید خصوصی معتبر نیست' };
        }

        if (init_params.public_key) {

        }
        else {
            status=false;
            message[message.length] = { key: 'public_key', message: ' کلید خصوصی معتبر نیست' };
        }
    }
    else {
        status=false;
        message[message.length] = { key: 'init_params', message: 'پارامترهای ورودی معتبر نیست' };
    }

    if (invoice) {
        if (invoice.header) {

        }
        else {
            status=false;
            message[message.length] = { key: 'invoice.header', message: 'سربرگ صورتحساب معتبر نیست' };
        }

        if (invoice.body) {

        }
        else {
            status=false;
            message[message.length] = { key: 'invoice.body', message: 'بدنه صورتحساب معتبر نیست' };
        }

        if (invoice.payments) {

        }
        else {
            status=false;
            message[message.length] = { key: 'invoice.payments', message: 'پرداخت صورتحساب معتبر نیست' };
        }
    }
    else {
        status=false;
        message[message.length] = { key: 'invoice', message: '  صورتحساب معتبر نیست' };
    }

    return { status: status, message: message, help: { client_id: '...', private_key: '...', public_key: '...', invoice: { header: {}, body: [{},{}], payments: [{},{}] } }, };
};
module.exports = middlewareObj;