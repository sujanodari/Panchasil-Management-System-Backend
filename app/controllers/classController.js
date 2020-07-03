var Classes= require('../models/classModel');
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

async function getallClass(req, res) {
  if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }

  try {
    const result = await Classes.findAll({
    });
    res.status(201)
    res.json(result);
  } catch (error) {
    res.json({
      status: 500,
      message: error,
    });
  }
}




module.exports={

    getallClass,

}

