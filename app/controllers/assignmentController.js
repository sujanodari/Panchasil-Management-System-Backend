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
    const result = await user.findOne({
      where: { userId: req.params.id },
    });
    if (result) {
      let userId = result.dataValues.userId;
      try {
        const result = await Classes.findOne({
          where: [{ class: req.body.class, section: req.body.section }],
        });

        if (result) {
          try {
            const result = await assignment.findOne({
              where: [{ title: req.body.title }],
            });
            if (result) {
              res.status(404);
              res.json({
                status: 404,
                message: "Assignment already Exists",
              });
            } else {
              console.log(userId);
              assignment.create({
                user_id: userId,
                class: req.body.class,
                section: req.body.section,
                submissiondate: req.body.submissiondate,
                title: req.body.title,
                image: req.body.image,
              });

              res.status(201);
              res.json({
                status: 201,
                message: "Assignment added",
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
          res.status(403);
          res.json({
            status: 403,
            message: "Class not found",
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
      res.status(405);
      res.json({
        status: 405,
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500);
    res.json({
      status: 500,
      message: err,
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
        try {
          const result = await assignment.findAll({
            where: { class: class_id },
          });
          if (result) {
            res.status(201);
            res.json({
              status: 201,
              result: result,
            });
          } else {
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

async function getAssignmentTeacher(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    const result = await assignment.findAll({
      where: [{ user_id: req.params.id }],
    });
    res.status(201);
    res.json(result);
  } catch (err) {
    res.status(500);
    res.json({
      status: 500,
      message: err,
    });
  }
}

async function deleteAssignment(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    assignment.destroy({
      where: { assignmentId: req.params.id },
    });
    res.status(201);
    res.json({
      status: 201,
      message: "assignment deleted",
    });
  } catch (err) {
    res.status(500);
    res.json({
      status: 500,
      message: err,
    });
  }
}

module.exports = {
  addAssignment,
  getStudentAssignment,
  getAssignmentTeacher,
  deleteAssignment,
};
