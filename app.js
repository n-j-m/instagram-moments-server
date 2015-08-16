var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");

// verify environment
var verifyEnvironment = require("./utils/verifyEnvironment");

var verifySignature = require("./utils/verifySignature");
var Constants = require("./config/constants");

verifyEnvironment();

// configure express
var app = express();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(bodyParser.json({
  verify: verifySignature
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: Constants.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, "public")));

var configPassport = require("./config/passport");

configPassport(app);

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var webhookRouter = require("./routes/webhook");

app.use("/", authRouter, indexRouter, webhookRouter);

module.exports = app;