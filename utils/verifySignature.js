var crypto = require("crypto");

// verifies the signature of the webhook post
function verifySignature(req, res, buf) {
  var signature = req.get("X-Hub-Signature");
  if (!signature) {
    return;
  }
  // requires signature validation
  var hmac = crypto.createHmac("SHA-1", Constants.INSTAGRAM_CLIENT_SECRET);

  var hash = hmac.update(buf).digest("hex");
  if (hash !== signature) {
    var err = new Error("Invalid Signature");
    err.status = 403;
    throw err;
  }
  req.verified = true;
}

module.exports = verifySignature;