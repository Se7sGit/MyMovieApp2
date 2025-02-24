var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var moviesRouter = require("./routes/movies");
var adminRouter = require("./routes/admins");
var app = express();

mongoose
  .connect(process.env.Connection_String)
  .then(() => {
    console.log("Connected to the DB successfully");
  })
  .catch((err) => {
    console.log(`Couldn't Connect to DB... Error: ${err}`);
    process.exit(1);
  });
// view engine setupssssss
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", moviesRouter);
app.use("/", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
//mongodb+srv://MovieHub:@@movie@@@cluster0.1iwcgml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
