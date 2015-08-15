var Router = require("express").Router;

var router = Router();

router.get("/webhook", function(req, res) {
  res.send(req.query["hub.challenge"]);
});

router.post("/webhook", function(req, res) {
  res.status(500).json({error: { message: "Not Implemented" }});
});

module.exports = router;