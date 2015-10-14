var passport = require("passport");
var InstagramStrategy = require("passport-instagram").Strategy;

var dataAccess = require("../data/access");
var Constants = require("./constants");
var processInstagramProfile = require("../utils/processInstagramProfile");

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

  passport.use(new InstagramStrategy({
    clientID: Constants.INSTAGRAM_CLIENT_ID,
    clientSecret: Constants.INSTAGRAM_CLIENT_SECRET,
    callbackURL: "/oauth_callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var parsedProfile = processInstagramProfile(profile);
    Promise.all([
      dataAccess.update(parsedProfile, "profiles", profile.id),
      dataAccess.update({accessToken: accessToken}, "tokens", profile.id)
    ])
    .then(function() { done(null, parsedProfile); })
    .catch(done);
  }));
}

module.exports = configPassport;