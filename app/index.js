"use strict";
var express = require("express");
var bodyParser = require("body-parser");

require("dotenv").config();
const morgan=require('morgan');
var app = express();
var cors = require("cors");

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
//api hit log
app.use(morgan('tiny'));
app.use(express.static(__dirname+ "/public"))


const registrationController = require("./controllers/registrationController");
const loginController = require("./controllers/loginController");
const forgotPassword = require("./controllers/forgotPassword");
const userApproved = require("./controllers/userApproved");
const newsController = require("./controllers/newsController");
const noticeController = require("./controllers/noticeController");
const userTokenController=require('./controllers/userFromToken');
const subjectController = require("./controllers/subjectController");
const classController=require('./controllers/classController')

//user registration routes
app.post("/api/v1/users/signup", registrationController.register);

//login routes
app.post("/api/v1/users/signin", loginController.login);

//forget password routes
app.put("/api/v1/users/forget", forgotPassword.forgetPassword);

//Approve registration 
app.get("/api/v1/approve", userApproved.getApproved);
app.put("/api/v1/approve/:id", userApproved.approveRegister);

//news route
app.post("/api/v1/news", newsController.addNews);
app.get("/api/v1/news", newsController.getallNews);
app.put("/api/v1/news/:id", newsController.updateNews);

// for Notice route
app.post("/api/v1/notice", noticeController.addNotice);
app.get("/api/v1/notice", noticeController.getallNotice);
app.put("/api/v1/notice/:id", noticeController.updateNotice);

//class Route
app.get('/api/v1/class', classController.getallClass)

//subject route
app.post("/api/v1/subjects", subjectController.addSubject);
app.get("/api/v1/subjects", subjectController.getallSubject);
app.delete("/api/v1/subjects/:id", subjectController.deleteSubject);

//subject Class
app.post("/api/v1/subjectsClass", subjectController.addSubjectClass);
app.get("/api/v1/subjectsClass", subjectController.getallSubjectClass);
app.delete("/api/v1/subjectsClass/:id", subjectController.deleteSubjectClass);

//student subject
app.get('/api/v1/student/subject/:id', subjectController.getStudentSubject)

//token decode route
app.get("/api/v1/decode",userTokenController.userFromToken);

//image upload
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
  }
}).single('myImage')

function checkFileType(file, cb) {
  const filetypes = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
      cb('You can upload only image files!');
     
  } else {
      return cb(null, true);
  }
}

app.post('/api/v1/imageUpload', (req, res) => {
 // console.log(req.file);
  upload(req, res, (error) => {
      if (error) {
          console.log(error)
          res.status(400).json({
              success: false,
              error: error
          })
      } else {
          if (req.file == undefined) {
              res.status(400).json({
                  success: 403,
                  message: "No File Selected!"
              });
          } else {
              res.status(201)
              res.json({status:201, fileName: req.file.filename });
          }
      }
  });
});
app.use(express.static(path.join(__dirname, './images/')));



app.use(function (err, req, res, next) {
  res.status(500);
  res.json({
    status: 500,
    message: err.message,
  });
});

app.listen(process.env.APP_PORT);
module.exports = app;
