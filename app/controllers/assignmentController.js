var Classes = require("../models/classModel");
var assignment = require("../models/assignmentModel");
var jwt = require("jsonwebtoken");
const user = require("../models/UserModel");
var Classes = require("../models/classModel");
var Enroll = require("../models/Enroll");
const { Op } = require("sequelize");

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

async function addAssignment(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    const result = await assignment.findOne({
      where: [{ title: req.body.title }],
    });

    if (result) {
      res.status(403);
      res.json({ status: 403, message: "assignment already exist" });
    } else {
      assignment.create({
        class: req.body.class,
        section: req.body.section,
        submissiondate: req.body.submissiondate,
        title: req.body.title,
        image: req.body.image,
      });

      res.status(201);
      res.json({ status: 201, message: "assignment added" });
    }
  } catch (error) {
    res.status(500);
    res.json({
      status: 500,
      message: error,
    });
  }
}

async function getStudentAssignment(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  const result = await Enroll.findOne({
    where: { user_id: req.params.id },
  });

  if (result) {
    let class_id = result.dataValues.class_id;
    let year = result.dataValues.year;

    try {
      const result = await Classes.findOne({
        where: { classId: class_id },
      });

      if (result) {
        let class_id = result.dataValues.class;
       // console.log(class_id + "mahesh");
        try {
          const result = await assignment.findOne({
            where: { class: class_id },
          });
          if(result){
          res.status(201);
          res.json({
            status: 201,
            result: result,
          });
        }else{
          res.status(500);
          res.json({
            status: 500,
            message: err,
          });
        }
        } catch (err) {
          res.status(500);
          res.json({
            status: 500,
            message: err,
          });
        }
      } else {
        res.status(404);
        res.json({
          status: 404,
          message: "Cllass not matched",
        });
      }
      // res.status(201);
      // res.json({
      //   status: 201,
      //   result: result,
      //   year: year,
      // });
    } catch (err) {
      res.status(500);
      res.json({
        status: 500,
        message: err,
      });
    }
  } else {
    res.status(404);
    res.json({
      status: 404,
      message: "Class not found for this user",
    });
  }
}

module.exports = {
  addAssignment,
  getStudentAssignment,
};
