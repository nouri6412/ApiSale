var express = require('express');

var router = express.Router({ mergeParams: true });

var middleware = require("../middleware");

router.get("/", middleware.action, async (req, res) => {
    return res.json({ state: true, message: "this is inquiry controller" });
});

//
// استعلام  نتیجه  با  Uid
//
router.post("/inquiry_by_uid_and_fiscalId", middleware.action, async (req, res) => {

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
// استعلام نتیجه با Refrence Number
//
router.post("/inquiry_by_reference_id", middleware.action, async (req, res) => {

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
// استعلام نتیجه براساس زمان 
//
router.post("/inquiry_by_time", middleware.action, async (req, res) => {

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
// استعلام نتیجه بر اساس بازه زمان 
//
router.post("/inquiry_by_time_range", middleware.action, async (req, res) => {

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
