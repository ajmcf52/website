var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
  const { email, name, password } = req.body;
});
