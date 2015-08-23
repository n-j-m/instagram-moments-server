var FirebaseTokenGenerator = require("firebase-token-generator");

var Constants = require("../config/constants");

var tokenGenerator = new FirebaseTokenGenerator(Constants.FIREBASE_SECRET);

function generateToken(user) {
  return tokenGenerator.createToken({
    uid: user.id,
    user: user
  });
}

module.exports = generateToken;