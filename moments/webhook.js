var request = require("superagent");

var Constants = require("../config/constants");
var post = require("../utils/web").post;

function parseResponse(res) {

}

function subscribeUser(profile) {
  return post(
    Constants.INSTAGRAM_SUBSCRIPTION_URL,
    {
      client_id: Constants.INSTAGRAM_CLIENT_ID,
      client_secret: Constants.INSTAGRAM_CLIENT_SECRET,
      object: "user",
      aspect: "media",
      verify_token: "moments.sendy.tokeny",
      callback_url: Constants.MOMENTS_WEBHOOK_URL
    },
    parseResponse
  );
}