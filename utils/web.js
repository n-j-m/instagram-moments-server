var request = require("superagent");

function returnResponse(res) {
  return res;
}

function post(url, data, parseResponse) {
  return new Promise(function(resolve, reject) {
    request
      .post(url)
      .type("form")
      .send(data)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }

        parseResponse = parseResponse || returnResponse;
        return resolve(parseResponse(res));
      });
  });
}

function get(url, data, parseResponse) {
  return new Promise(function(resolve, reject) {
    request
      .get(url)
      .query(data)
      .end(function(err, res) {
        if (err) {
          return reject(err);
        }

        parseResponse = parseResponse || returnResponse;
        return resolve(parseResponse(res));
      });
  });
}

module.exports = {
  post: post,
  get: get
};