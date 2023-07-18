var express = require('express');

var router = express.Router({ mergeParams: true });

var middleware = require("../middleware");

router.get("/", middleware.action, async (req, res) => {
    return res.json({ state: true, message: "this is invoice controller" });
});

router.post("/send_invoice", middleware.action, async (req, res) => {

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
