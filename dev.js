var lt = require("localtunnel");
var http = require("http");

require("dotenv").load();

var app = require("./app");

var server = http.createServer(app);

server.listen(app.get("port"));

server.on("listening", function() {
  lt(app.get("port"), {
    subdomain: "jamesonmoments"
  }, function(err, tunnel) {
    if (err) {
      throw err;
    }
    console.log("tunneled to ", tunnel.url);
  });

  console.log("App listening on port", app.get("port"));
});