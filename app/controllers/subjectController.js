var subject = require("../models/subjectModel.js");
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

async function addSubject(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    await subject.create({
      subjectName: req.body.subjectName
    });
    res.status(201);
    res.json({
      status: 201,
      message: "Subject  added",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error: " + error,
    });
  }
}

async function getallSubject(req, res) {
  try {
    const result = await subject.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200);
    res.json(result);
  } catch (error) {
    res.json({
      status: 500,
      message: error,
    });
  }
}

async function updateSubject(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  //console.log(req.body);
  try {
    await subject.update(
      {
        subjectName: req.body.subjectName
      },
      {
        where: {
          subId: req.params.id,
        },
      }
    );
    res.status(201);
    res.json({
      status: 201,
      message: "Subject Update successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: error,
    });
  }
}

module.exports = {
  addSubject,
  getallSubject,
  updateSubject
};
