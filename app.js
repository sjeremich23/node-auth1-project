const express = require("express");
const createError = require("http-errors");

const appConfig = require("./api/config/appConfig");

const indexRouter = require("./bin");
const usersRouter = require("./api/routes/users");
const restrictedRouter = require("./api/auth/restricted");

const app = express();

appConfig(app);

app.use("/", indexRouter);
app.use("/api", usersRouter);
app.use("/api/restricted", restrictedRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(500).json({ err, error: "Cannot access the database" });
});

module.exports = app;
