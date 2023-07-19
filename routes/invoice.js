var express = require('express');

var router = express.Router({ mergeParams: true });

var middleware = require("../middleware");
var validation = require("../validation/invoice");

router.get("/", middleware.action, async (req, res) => {
    return res.json({
        methods:[
            {
                method:'send_invoice',
                description:'تابع ارسال صورتحساب'
            }
        ]
    });
});

router.post("/send_invoice", middleware.action, async (req, res) => {
    try {
        
        const {
            init_params, invoice } = req.body;

        var init_validation = validation.init( init_params, invoice);
        if (!init_validation.status) {
            return res.json(init_validation);
        }

        return res.json({ status: true, data: { init_params: init_params, invoice: invoice } });
    }
    catch (err) {
        console.log(err);
        return res.json({ status: false, message: 'error in compile' });
    }
});

module.exports = router;
