
// Simple route middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect("/");
}

module.exports = ensureAuthenticated;