var Router = require("express").Router;
var async = require("async");

var dataAccess = require("../data/access");
var errorBack = require("../utils/errorBack");

var getPhotos = require("../moments/getPhotos");

function getChangedPhoto(change, token) {
  return getPhotos(change.object_id, token, change.time);
}

function mapUserPhotos(userId, memo, photos) {
  photos.forEach(function(photo) {
    if (!memo[userId]) {
      memo[userId] = {};
    }
    memo[userId][photo.id] = photo;
  });
  return Promise.resolve(memo);
}

function processChange(memo, change, done) {
  return dataAccess.get("tokens", change.object_id)
    .then(getChangedPhoto.bind(null, change))
    .then(mapUserPhotos.bind(null, change.object_id, memo))
    .then(done.bind(null, null, memo))
    .catch(done);
}

function completeChangesProcessing(resolve, reject, err, photos) {
  if (err) {
    reject(err);
  }
  else {
    dataAccess.update(photos, "photos")
      .then(resolve)
      .catch(reject);
  }
}

function processChanges(changes) {
  return new Promise(function(resolve, reject) {
    async.reduce(
      changes,
      {},
      processChange,
      completeChangesProcessing.bind(null, resolve, reject)
    );
  });
}

var router = Router();

router.get("/webhook", function(req, res) {
  console.log("hub.challenge:", req.query["hub.challenge"]);
  res.send(req.query["hub.challenge"]);
});

router.post("/webhook", function(req, res) {
  console.log("webhook:", req.verified);
  if (!req.verified) {
    return res.status(403).end("Unauthorized");
  }

  processChanges(req.body)
    .then(function(photos) {
      console.log("changes processed:", photos);
    })
    .catch(function(err) {
      console.log("error processing changes:", err);
    });

  console.log("body:", req.body);
  res.status(200).end("");
});

module.exports = router;