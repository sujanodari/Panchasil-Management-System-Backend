var questions = require("../models/questionModels");
var jwt = require("jsonwebtoken");


const SECRET_KEY = "secret_key";
function notAuthenticated(res) {
  res.json({
    status: 404,
    message: "You are not authenticate user",
    code: 404,
  });
}

function authenticate(token) {
  if (!token) {
    return false;
  }
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return true;
    // use payload if required
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addQuestionBank(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    await questions.create({
      class: req.body.class,
      section: req.body.section,
      Exam_type: req.body.Exam_type,
      ExamDate: req.body.ExamDate,
      questionBank: req.body.questionBank,
    });
    res.json({
      status: 201,
      message: "questions  added",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error: " + error,
    });
  }
}

module.exports = {
    addQuestionBank,
    
  };