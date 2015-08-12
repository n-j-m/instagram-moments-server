var passport = require("passport");

var dataAccess = require("../data/access");

function configPassport(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(userId, done) {
    dataAccess.get("profiles", userId)
      .then(function(profile) {
        done(null, profile);
      })
      .catch(done);
  });
}

module.exports = configPassport;