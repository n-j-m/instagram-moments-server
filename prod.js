var app = require("./app");

app.listen(app.get("port"), function() {
  console.log("app listening on port", app.get("port"));
});