
var Constants = require("../config/constants");

// verify that we have all our environment variables configured
function verifyEnvironment() {
  var missingKeys = [];
  var keys = Object.keys(Constants);
  for (var i = 0, l = keys.length; i < l; i++) {
    if (!Constants[keys[i]]) {
      missingKeys.push(keys[i]);
    }
  }

  if (missingKeys.length) {
    throw new Error(["The following keys were missing: "].concat(missingKeys).join("\n"));
  }
}

module.exports = verifyEnvironment;