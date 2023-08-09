var express = require('express');

const config = require('./config');

//
// ذخیره لاگ کنسول در فایل
//
var fs = require('fs');
var util = require('util');

var log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
var log_stdout = process.stdout;

console.log = function (d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

var app = express();

app.use(express.json());

var invoiceRoutes = require("./routes/invoice"); //invoice controller  (ارسال و کنترل صورتحساب)
var inquiryRoutes = require("./routes/inquiry"); //inquiry controller  (استعلام صورتحساب)
var helperRoutes = require("./routes/helper");   //helper controller   (توابع کمکی مثل گرفتن اطلاعات کداقتصادی - اطلاعات کاربرو...)

const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use("/invoice", invoiceRoutes);
app.use("/inquiry", inquiryRoutes);
app.use("/helper", helperRoutes);

app.get('/', function (req, res) {
    res.send({
        routes:[
            {
                route:'invoice',
                description:'ارسال صورتحساب',
            },
            {
                route:'inquiry',
                description:'استعلام صورتحساب'
            },
            {
                route:'helper',
                description:'توابع کمکی مثل گرفتن اطلاعات کداقتصادی - اطلاعات کاربرو..'
            }
        ]
    });
});

var server = app.listen(config.app.port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("this app listening at http://%s:%s", host, port)
});