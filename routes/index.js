var router = require("express").Router();

var ensureAuthenticated = require("../utils/ensureAuthenticated");
var generateToken = require("../utils/generateToken");
var Constants = require("../config/constants");

router.get("/", function(req, res) {
  res.render("index", { title: "jameson #moments"});
});

router.get("/done", ensureAuthenticated, function(req, res) {
  res.render("done", { title: "jameson #moments", profile: JSON.stringify(req.user) });
});

router.get("/manage", ensureAuthenticated, function(req, res) {
  var token = generateToken(req.user);
  res.redirect(Constants.MANAGE_PHOTOS_URL + "?token=" + token);
});

module.exports = router;