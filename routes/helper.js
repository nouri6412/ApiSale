var express = require('express');

var router = express.Router({ mergeParams: true });

var middleware = require("../middleware");

router.get("/", middleware.action, async (req, res) => {
    return res.json({ state: true, message: "this is helper controller" });
});


//
//گرفتن اطلاعات حافظه مالیاتی
//
router.post("/get_fiscal_information", middleware.action, async (req, res) => {

    const dbConnect = dbo.getDb();
    try {
        const {
            id } = req.body;

        return res.json({ state: true, message: "data is valid" });
    }
    catch (err) {
        console.log(err);
        return res.json({ state: false, message: 'error in data' });
    }
});

//
//استعلام کد اقتصادی
//
router.post("/get_economic_code_information", middleware.action, async (req, res) => {

    const dbConnect = dbo.getDb();
    try {
        const {
            id } = req.body;

        return res.json({ state: true, message: "data is valid" });
    }
    catch (err) {
        console.log(err);
        return res.json({ state: false, message: 'error in data' });
    }
});

//
// گرفتن اطلاعات کالا و خدمات
//
router.post("/get_service_stuff_list", middleware.action, async (req, res) => {

    const dbConnect = dbo.getDb();
    try {
        const {
            id } = req.body;

        return res.json({ state: true, message: "data is valid" });
    }
    catch (err) {
        console.log(err);
        return res.json({ state: false, message: 'error in data' });
    }
});

module.exports = router;
