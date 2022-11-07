const express = require("express");
const router = express.Router();
const path = require("path");
const api = require("../api");

//GET http://localhost:3000/
router.route("/").get(async (req, res) => {
    var options = {
        root: path.join(__dirname),
    };
    // const test = await api.indiApi.a();
    // await api.indiApi.addtest();
    res.render("pages/apiTest", {
        action: "/test",
        title: "Api Test:",
        HTML_title: "Api Test",
    });
    // res.sendFile(path.resolve("index.js"));
});

//POST http://localhost:3000/test
router.route("/test").post(async (req, res) => {
    let input = req.body.test_form;
    const test = await api.indiApi.createIndi(input, "test", "test", "test", "test");
    // res.redirect("../");
    res.json(await api.gedcomApi.generateFile());
    return;
});

module.exports = router;
