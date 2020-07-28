var exam = require("../models/examModel");
var jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const SECRET_KEY = "secret_key";
const examuser = require("../models/examUser");
const ExamUser = require("../models/examUser");

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
async function addExam(req, res) {

  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {


    await exam.create({
      Exam_type: req.body.Exam_type,
      ExamDate: req.body.ExamDate,
    });
    res.status(201);
    res.json({
      status: 201,
      message: "Exam  added",
    });



  } catch (error) {
    console.log(error)
    res.status(500);
    res.json({
      status: 500,
      message: "Error: " + error,
    });
  }
}


async function deleteExam(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  if (req.params.id === null) {
    res.status(403);
    res.json({
      status: 403,
      message: "ID is not provided"
    });
  } else {
    exam.destroy({
      where: {

        ExamId: req.params.id,


      }
    })
      .then(function (result) {
        if (result === 0) {
          res.status(404);
          res.json({
            status: 404,
            message: "Exam not found"
          });
        } else {
        }
        res.status(200);
        res.json({ status: 200, message: "successfully deleted" });
      })
      .catch(function (err) {
        console.log(error);
        res.status(500)
        res.json({
          status: 500,
          message: error
        });
      });
  }
}

async function getAllExam(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    const result = await exam.findAll()
    res.status(200)
    res.json(
      result
    )
  }
  catch (error) {
    res.status(500)
    res.json({
      status: 500,
      message: error
    })
  }
}


async function addExamUser(req, res) {

  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {
    const result = await examuser.findOne({
      where: { UserId: req.body.UserId, ExamId:req.body.ExamId}
    })
    if (result) {
      res.status(402)
      res.json({
        status: 402, message: "user already added in exam"
      })


    }
    else {
      await examuser.create({
        UserId: req.body.UserId,
        ExamId: req.body.ExamId,
      });
      res.status(201);
      res.json({
        status: 201,
        message: "User added in Exam",
      });
    }

  } catch (error) {
    console.log(error)
    res.status(500);
    res.json({
      status: 500,
      message: "Error: " + error,
    });
  }
}

async function deleteUserExam(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  if (req.params.id === null) {
    res.status(403);
    res.json({
      status: 403,
      message: "ID is not provided"
    });
  } else {
    examuser.destroy({
      where: {

        Id: req.params.id,


      }
    })
      .then(function (result) {
        if (result === 0) {
          res.status(404);
          res.json({
            status: 404,
            message: "Exam not found"
          });
        } else {
        }
        res.status(200);
        res.json({ status: 200, message: "successfully deleted" });
      })
      .catch(function (err) {
        console.log(error);
        res.status(500)
        res.json({
          status: 500,
          message: error
        });
      });
  }
}

async function getAllUserExam(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    const result = await examuser.findAll()
    res.status(200)
    res.json(
      result
    )
  }
  catch (error) {
    res.status(500)
    res.json({
      status: 500,
      message: error
    })
  }
}


module.exports = {
  addExam,
  getAllExam,
  deleteExam,
  addExamUser,
  deleteUserExam,
  getAllUserExam,
};