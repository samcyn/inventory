let express = require('express');
let router = express.Router();
apisRoutes = require("./apis/index");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("You\'ve reached /apis routes");
});
router.use("/apis", apisRoutes);
module.exports = router;
