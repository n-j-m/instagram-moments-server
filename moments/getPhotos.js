var get = require("../utils/web").get;
var Constants = require("../config/constants");

function parseResponse(res) {
  return res.body.data;
}

function getPhotos(userId, accessToken, fromTimeStamp) {
  return get(
    Constants.INSTAGRAM_API_URL + "/users/" + userId + "/media/recent",
    {
      MIN_TIMESTAMP: fromTimeStamp,
      ACCESS_TOKEN: accessToken
    },
    parseResponse
  );
}