let router = require("express").Router(),
    v1Routes = require("./v1/index");

router.use("/v1", v1Routes);

router.get("/", function(req, res){
    res.send("You\'ve reached /apis routes");
});

module.exports = router;
