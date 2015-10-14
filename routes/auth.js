var passport = require("passport");
var Router = require("express").Router;

var subscribeUser = require("../moments/subscribeUser");
var dataAccess = require("../data/access");

var router = Router();

router.get("/auth", passport.authenticate("instagram"));

router.get(
  "/oauth_callback",
  passport.authenticate("instagram", { failureRedirect: "/" }),
  function(req, res) {
    // success
    subscribeUser(req.user)
      .then(function(subscription) {
        // save user's subscription
        return dataAccess.update(subscription, "subscriptions", req.user.id);
      })
      .then(function() {
        // redirect to user's profile
        res.redirect("/done");
      })
      .catch(function(err) {
        res.status(500).json(err);
      });
  }
);

module.exports = router;