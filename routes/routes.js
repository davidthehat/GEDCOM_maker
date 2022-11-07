const express = require("express");
const router = express.Router();
const path = require("path");
const api = require("../api");

//GET http://localhost:3000/
router.route("/").get(async (req, res) => {
    var options = {
        root: path.join(__dirname),
    };
    const test = await api.indiApi.a();
    await api.indiApi.addtest();
    res.send({ test });
    // res.sendFile(path.resolve("index.js"));
});

module.exports = router;
