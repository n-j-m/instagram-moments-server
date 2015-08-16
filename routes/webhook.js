var Router = require("express").Router;

var router = Router();

router.get("/webhook", function(req, res) {
  console.log("hub.challenge:", req.query["hub.challenge"]);
  res.send(req.query["hub.challenge"]);
});

router.post("/webhook", function(req, res) {
  console.log("body:", req.body);
  res.status(200).end("");
});

module.exports = router;