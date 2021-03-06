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


//user registration routes
const registrationController = require("./controllers/registrationController");
app.post("/api/v1/users/signup", registrationController.register);

//login routes
const loginController = require("./controllers/loginController");
app.post("/api/v1/users/signin", loginController.login);

//search
const searchController = require("./controllers/searchController")
app.get("/api/v1/search", searchController.getallUsers);


//forget password routes
const forgotPassword = require("./controllers/forgotPassword");
app.put("/api/v1/users/forget", forgotPassword.forgetPassword);

//Approve registration 
const userApproved = require("./controllers/userApproved");
app.get("/api/v1/approve", userApproved.getApproved);
app.put("/api/v1/approve/:id", userApproved.approveRegister);

//token decode route
const userTokenController=require('./controllers/userFromToken');
app.get("/api/v1/decode",userTokenController.userFromToken);

//news route
const newsController = require("./controllers/newsController");
app.post("/api/v1/news", newsController.addNews);
app.get("/api/v1/news", newsController.getallNews);
app.get("/api/v1/news/:id",newsController.getNewsById);
app.put("/api/v1/news/:id",newsController.updateNews);
app.patch("/api/v1/news/:id",newsController.updateNewsImage);

// assignment route
const assignmentController=require('./controllers/assignmentController');
app.post('/api/v1/assignment/:id', assignmentController.addAssignment);
app.get('/api/v1/assignment/:id', assignmentController.getStudentAssignment);
app.get('/api/v1/teacherassignment/:id', assignmentController.getAssignmentTeacher);
app.delete("/api/v1/teacherassignment/:id",assignmentController.deleteAssignment);
// for Notice route
const noticeController = require("./controllers/noticeController");
app.post("/api/v1/notice", noticeController.addNotice);
app.get("/api/v1/notice", noticeController.getallNotice);
app.get("/api/v1/notice/:id", noticeController.getNoticeById);
app.put("/api/v1/notice/:id", noticeController.updateNotice);
app.patch("/api/v1/notice/:id", noticeController.updateNoticeImage);
// for activities
const activitiesController=require('./controllers/activitiesController');
app.post('/api/v1/activities', activitiesController.addActivities);
app.get('/api/v1/activities', activitiesController.getallActivities);
app.delete("/api/v1/activities/:id",activitiesController.deleteActivities);
//user routes
const userController = require('./controllers/userController')
app.get("/api/v1/users", userController.getallUsers)
app.get("/api/v1/users/staff", userController.getallUsersStaff)
app.get("/api/v1/users/student", userController.getallUsersStudent)
app.put("/api/v1/users/:id",userController.updateUserDetails);
app.patch("/api/v1/users/:id",userController.updateProfilePicture);
app.delete("/api/v1/users/:id",userController.deleteUser);
app.get("/api/v1/users/:id",userController.getUserById);
app.put("/api/v1/users/add/attendence/:id",userController.addAttendence);
app.put("/api/v1/users/sub/attendence/:id",userController.subAttendence);
app.get("/api/v1/usersClass/:id",userController.getUserClassById);

//class route
const classController=require('./controllers/classController')
app.post('/api/v1/class', classController.addclass)
app.get('/api/v1/class', classController.getallClass)
app.get('/api/v1/class/student/:id', classController.getStudentClass)
app.delete('/api/v1/class/:id', classController.deleteClass)
app.get('/api/v1/enroll', classController.getallEnrolls)
app.get('/api/v1/enroll/class/:id', classController.getAllEnrollsByClass)
app.post('/api/v1/enroll/:id', classController.enrollStudent)
app.delete('/api/v1/enroll/:id', classController.deleteEnroll)
app.put('/api/v1/routine/:id', classController.updateRoutine)
app.delete('/api/v1/routine/:id', classController.deleteRoutine)
app.put('/api/v1/fee/:id', classController.addFees)
app.get('/api/v1/class/:id', classController.getClassById)
app.put('/api/v1/class/:id', classController.updateClass)
//subject route
const subjectController = require("./controllers/subjectController");
app.post("/api/v1/subjects", subjectController.addSubject);
app.get("/api/v1/subjects", subjectController.getallSubject);
app.delete("/api/v1/subjects/:id", subjectController.deleteSubject);
app.post("/api/v1/subjectsClass", subjectController.addSubjectClass);
app.get("/api/v1/subjectsClass", subjectController.getallSubjectClass);
app.delete("/api/v1/subjectsClass/:id", subjectController.deleteSubjectClass);
app.get('/api/v1/student/subject/:id', subjectController.getStudentSubject)
app.get('/api/v1/subjects/:id', subjectController.getSubjectById)
app.put('/api/v1/subjects/:id', subjectController.updateSubject)
//fee route

const feeController = require ("./controllers/feeController");
app.post("/api/v1/fees", feeController.addFee);
app.get("/api/v1/fees", feeController.getFee);
app.get("/api/v1/fees/:id", feeController.getFeeById);
app.delete("/api/v1/fees/:id", feeController.deleteFee);
app.get("/api/v1/fee", feeController.getUserByEmail);
app.put("/api/v1/fees/:id", feeController.updateFees);

const questionController=require("./controllers/questionController");
app.post('/api/v1/question/:id',questionController.addQuestionBank);
app.get('/api/v1/teacherQuestion/:id', questionController.getQuestionTeacher);
app.get("/api/v1/question/:id", questionController.getQuestionById);
app.delete("/api/v1/question/:id", questionController.deleteQuestion);

//for character
const characterController = require ("./controllers/characterController");
app.post("/api/v1/character", characterController.addCharacter);

//exam route
const examController=require("./controllers/examController");
app.post('/api/v1/exam',examController.addExam);
app.delete('/api/v1/exam/:id',examController.deleteExam);
app.get('/api/v1/exam',examController.getAllExam);
app.post('/api/v1/exam/user',examController.addExamUser);
app.delete('/api/v1/exam/user/:id',examController.deleteUserExam);
app.get('/api/v1/exam/user',examController.getAllUserExam);

//add marks route
const addExamMarkController=require("./controllers/addExamMarkController");
app.post('/api/v1/ExamMarks',addExamMarkController.AddMarks);
app.get('/api/v1/ExamMarks',addExamMarkController.getAllExamMarks);
app.get('/api/v1/ExamMarks/:id',addExamMarkController.getExamMarksById);
app.put('/api/v1/ExamMarks/:id',addExamMarkController.updateExamMarks);

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
  const filetypes = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|docx|pdf)$/;
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



const pdf = require('html-pdf');
const invoiceTemplate = require('./documents/invoice');
const characterTemplate=require('./documents/character');
const addUserTemplate=require('./documents/addUser')
const feeClearanceTemplate=require('./documents/feeClearance')

app.post('/api/v1/createInvoice', (req, res) => {
  pdf.create(invoiceTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }

      res.send(Promise.resolve());
  });
});

app.get('/api/v1/fetchInvoice', (req, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`)
})



app.post('/api/v1/createFeeClearance', (req, res) => {
  pdf.create(feeClearanceTemplate(req.body), {}).toFile('Clearance.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }

      res.send(Promise.resolve());
  });
});

app.get('/api/v1/fetchFeeClearance', (req, res) => {
  res.sendFile(`${__dirname}/Clearance.pdf`)
})


app.post('/api/v1/createCharacter', (req, res) => {
  pdf.create(characterTemplate(req.body), {}).toFile('character.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }

      res.send(Promise.resolve());
  });
});

app.get('/api/v1/fetchCharacter', (req, res) => {
  res.sendFile(`${__dirname}/character.pdf`)
})



app.post('/api/v1/createAddUser', (req, res) => {
  pdf.create(addUserTemplate(req.body), {}).toFile('addUser.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }

      res.send(Promise.resolve());
  });
});

app.get('/api/v1/fetchAddUser', (req, res) => {
  res.sendFile(`${__dirname}/addUser.pdf`)
})



app.use(function (err, req, res, next) {
  res.status(500);
  res.json({
    status: 500,
    message: err.message,
  });
});

app.listen(process.env.APP_PORT);
module.exports = app;
