var router = require("express").Router();

router.get("/", function(req, res) {
  res.render("index", { title: "jameson #moments"});
});

module.exports = router;