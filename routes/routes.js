const express = require("express");
const router = express.Router();
const path = require("path");
const api = require("../api");


//dirty trick for getting the function arg name
//for 
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}


//GET http://localhost:3000/
router.route("/").get(async (req, res) => {
    var options = {
        root: path.join(__dirname),
    };
    // const test = await api.indiApi.a();
    // await api.indiApi.addtest();
    await api.indiApi.createIndi("Mary", "1/1/1990", "1/1/1990", [], null);
    await api.indiApi.createIndi("Tom", "1/1/1990", "1/1/1990", [], null);
    
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
    let action = req.body.action;
    if (action == "nuplets") {
        let n = req.body.n;
        let famId = req.body.fam;
        await api.commonApi.generateNuplets(famId, n);
    } else if (action == "marry") {
        let p1 = req.body.p1;
        let p2 = req.body.p2;
        await api.commonApi.marry(p1, p2, null);
    }
    // const test = await api.indiApi.createIndi(input, "test", "test", "test", "test");
    res.redirect("../");
    // res.json(await api.gedcomApi.generateFile());
    return;
});

module.exports = router;
