var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

// configure express
var app = express();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: "dishesandspoonsandrunningandsuch",
  resave: false,
  saveUninitialized: true
}));

var configPassport = requrie("./config/passport");

configPassport(app);

var indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.listen(app.get("port"), function() {
  console.log("server listening on port", app.get("port"));
});