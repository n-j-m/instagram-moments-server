var router = require("express").Router();

var ensureAuthenticated = require("../utils/ensureAuthenticated");

router.get("/", function(req, res) {
  res.render("index", { title: "jameson #moments"});
});

router.get("/done", ensureAuthenticated, function(req, res) {
  res.render("done", { title: "jameson #moments", profile: JSON.stringify(req.user) });
});

module.exports = router;