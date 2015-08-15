var passport = require("passport");
var Router = require("express").Router;

var router = Router();

router.get("/auth", passport.authenticate("instagram"));

router.get(
  "/oauth_callback",
  passport.authenticate("instagram", { failureRedirect: "/" }),
  function(req, res) {
    // success
    res.redirect("/done");
  }
);

module.exports = router;