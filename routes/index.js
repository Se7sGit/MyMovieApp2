var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ message: "all movies" });
});
router.get("/generateToken", (req, res, next) => {
  res.send({ message: "all movies" });
});

module.exports = router;
