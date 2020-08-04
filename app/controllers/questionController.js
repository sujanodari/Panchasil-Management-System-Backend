var questions = require("../models/questionModels");
var jwt = require("jsonwebtoken");
const user = require("../models/UserModel");
var Classes = require("../models/classModel");
var Enroll = require("../models/Enroll");

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
            const result = await questions.findOne({
              where: [{ ExamDate: req.body.ExamDate }],
            });
            if (result) {
              res.status(404);
              res.json({
                status: 404,
                message: "Question already Exists",
              });
            } else {
              console.log(userId);
              questions.create({
                user_id: userId,
                class: req.body.class,
                section: req.body.section,
                Exam_type: req.body.Exam_type,
                ExamDate: req.body.ExamDate,
                questionBank: req.body.questionBank,
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




async function getQuestionTeacher(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    const result = await questions.findAll({
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

async function getQuestionById(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {
    const result = await questions.findAll({
      where: {
        
        questionId: req.params.id,
      }
    });

    const data = {

      class: result[0].class,
      section: result[0].section,
      Exam_type: result[0].Exam_type,
      ExamDate: result[0].ExamDate,
      
      };

console.log(data)
    res.status(201)
    res.json(data);
  } catch (error) {
    res.status(500)
    res.json({
      status: 500,
      message: error
    });
  }
}

async function deleteQuestion(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

 
    try {
      await questions.destroy(
        {
          where: {
            questionId: req.params.id,
          },
        }
      );
      res.status(204);
      res.json({
        status: 204,
        message: "Question Deleted successfully!",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 500,
        message: error,
      });
    }
}
// async function updateQuestionFile(req, res) {
//   if (authenticate(req.headers.authorization) === false) {
//     notAuthenticated(res);
//     return;
//   }
//   //console.log(req.body);
//   try {
//     await questions.update(
//       {
//         questionBank: req.body.questionBank,
//       },
//       {
//         where: {
//           questionId: req.params.id,
//         },
//       }
//     );
//     res.json({
//       status: 201,
//       message: "Question Update successfully!",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       status: 500,
//       message: error,
//     });
//   }
// }


module.exports = {
    addQuestionBank,
    getQuestionTeacher,
    getQuestionById,
    deleteQuestion,
    //updateQuestionFile
  };