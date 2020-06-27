"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var registrationController = require("./controllers/registrationController");
require("dotenv").config();
var app = express();
var cors = require("cors");
const loginController = require("./controllers/loginController");
const forgotPassword = require("./controllers/forgotPassword");
const userApproved = require("./controllers/userApproved");
const newsController = require("./controllers/newsController");
var multer = require("multer");
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.post("/api/v1/users/signup", registrationController.register);
app.post("/api/v1/users/signin", loginController.login);
app.put("/api/v1/users/forget", forgotPassword.forgetPassword);
// news route
app.post("/api/v1/news", newsController.addNews);
app.get("/api/v1/news", newsController.getallNews);
app.put("/api/v1/news/:id", newsController.updateNews);
var storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//multer is used to upload the file
var upload = multer({ storage: storage });
// for approve
app.get("/api/v1/users/approve", userApproved.getApproved);
app.put("/api/v1/users/approve/:id", userApproved.approveRegister);
// for image
app.post("/api/v1/users/image", upload.single("image"), function (req, res) {
  if ((req.file === undefined) | null) {
    res.status(500);
    res.json({
      status: 500,
      messsage: "image cannot be empty",
    });
  } else {
    res.status(201);
    res.json({
      status: 201,
      //filename: req.file.filename,
      message: "image uploaded",
    });
  }
});
app.use(function (err, req, res, next) {
  res.status(500);
  res.json({
    status: 500,
    message: err.message,
  });
});

app.listen(process.env.APP_PORT);
module.exports = app;
