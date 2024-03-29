var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const isAPIRequest = require("./lib/utils");
const swaggerMiddleware = require("./lib/swaggerMiddleware");

var app = express();

require("./lib/connectMongose");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.locals.title = "NodePoP";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/content", express.static(path.join(__dirname, "public"))); // añado un path estático cómo haría en en un nginx
app.use("/api-docs", swaggerMiddleware);

/* Rutas API */
app.use("/api/anuncios", require("./routes/api/anuncios"));

/* Rutas WebSite */
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // Gestión errores Not Found
  if (err.array) {
    // error Not Found
    err.status = 404;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = `(${errInfo.location}) ${errInfo.param} ${errInfo.msg}`;
  }
  // Gestión errores de validación
  if (err.array) {
    // error de validación
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = `(${errInfo.location}) ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  // si es un error en el API respondo JSON
  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
    // const errInfo = err.array({ onlyFirstError: true })[0];
    // err.message = `(${errInfo.location}) ${errInfo.param} ${errInfo.msg}`;
    // return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page

  res.render("error");
});

module.exports = app;
