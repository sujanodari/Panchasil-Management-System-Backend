"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var registrationController = require("./controllers/registrationController");
require("dotenv").config();
var app = express();
var cors = require("cors");
const loginController = require("./controllers/loginController");
const forgotPassword = require("./controllers/forgotPassword");

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.post("/api/v1/users/signup", registrationController.register);
app.post("/api/v1/users/signin", loginController.login);
app.put("/api/v1/users/forget", forgotPassword.forgetPassword);

app.use(function (err, req, res, next) {
  res.status(500);
  res.json({
    status: 500,
    message: err.message,
  });
});

app.listen(process.env.APP_PORT);
module.exports = app;
