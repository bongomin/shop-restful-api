var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    message: "welcome to the Shop Api Developed By Daniel"
  })
});
module.exports = router;
