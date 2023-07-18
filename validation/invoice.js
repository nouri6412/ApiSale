var middlewareObj = {};

middlewareObj.init = function (init_params, invoice) {

    var status = true;
    var message = [];

    if (init_params) {
        if (init_params.client_id) {

        }
        else {
            status=false;
            message[message.length] = { param: 'client_id', message: ' حافظه مالیاتی معتبر نیست' };
        }

        if (init_params.private_key) {

        }
        else {
            status=false;
            message[message.length] = { param: 'private_key', message: 'کلید خصوصی معتبر نیست' };
        }

        if (init_params.public_key) {

        }
        else {
            status=false;
            message[message.length] = { param: 'public_key', message: ' کلید خصوصی معتبر نیست' };
        }
    }
    else {
        status=false;
        message[message.length] = { param: 'init_params', message: 'پارامترهای ورودی معتبر نیست' };
    }

    if (invoice) {
        if (invoice.header) {

        }
        else {
            status=false;
            message[message.length] = { param: 'invoice.header', message: 'سربرگ صورتحساب معتبر نیست' };
        }

        if (invoice.body) {

        }
        else {
            status=false;
            message[message.length] = { param: 'invoice.body', message: 'بدنه صورتحساب معتبر نیست' };
        }

        if (invoice.payment) {

        }
        else {
            status=false;
            message[message.length] = { param: 'invoice.payment', message: 'پرداخت صورتحساب معتبر نیست' };
        }
    }
    else {
        status=false;
        message[message.length] = { param: 'invoice', message: '  صورتحساب معتبر نیست' };
    }

    return { status: status, message: message, help: { client_id: '...', private_key: '...', public_key: '...', invoice: { header: {}, body: [{},{}], payment: [{},{}] } }, };
};

module.exports = middlewareObj;