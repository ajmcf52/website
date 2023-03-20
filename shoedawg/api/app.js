var cookieParser = require("cookie-parser");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");
var axios = require("axios");

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
axios.defaults.withCredentials = true;
//axios.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:3000";

var indexRouter = require("./routes/index");
var signup = require("./routes/signup");
var login = require("./routes/login");
var refreshToken = require("./routes/refreshToken");
var addToCart = require("./routes/addToCart");
var getAllShoes = require("./routes/getAllShoes");
var getCartCount = require("./routes/getCartCount");
var initCart = require("./routes/initCart");
var addToCart = require("./routes/addToCart");
var removeFromCart = require("./routes/removeFromCart");
var clearCart = require("./routes/clearCart");
var cartContents = require("./routes/cartContents");
var clearCartSelection = require("./routes/clearCartSelection");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST", "OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization, Cookie");
    res.setHeader("Access-Control-Expose-Headers", "Cookie");
    next();
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());

app.use(indexRouter);
app.use(signup);
app.use(login);
app.use(refreshToken);
app.use(addToCart);
app.use(getAllShoes);
app.use(getCartCount);
app.use(initCart);
app.use(addToCart);
app.use(removeFromCart);
app.use(clearCart);
app.use(cartContents);
app.use(clearCartSelection);

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
