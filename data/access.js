var Firebase = require("firebase");
var Promise = require("es6-promise").Promise;

var Constants = require("../config/constants");
var toArray = require("../utils/toArray");
var errorBack = require("../utils/errorBack");

var momentsRef = new Firebase(Constants.FIREBASE_URI);

function get(/*...path*/) {
  var path = toArray(arguments);
  return new Promise(function(resolve, reject) {
    momentsRef.child(path.join("/"))
      .once("value", function(snap) {
        resolve(snap.val());
      }, reject);
  });
}

function update(/*value, ...path*/) {
  var path = toArray(arguments);
  var value = path.shift();
  return new Promise(function(resolve, reject) {
    refPath(path)
      .update(
        value,
        errorBack(resolve.bind(null, value), reject)
      );
  });
}

module.exports = {
  get: get,
  update: update
};