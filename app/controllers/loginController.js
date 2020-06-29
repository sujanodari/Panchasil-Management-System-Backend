var user = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";

async function login(req, res, next) {
  const password = req.body.password;
  try {
    const result = await user.findOne({
      where: { email: req.body.email },
    });
    if (result) {
      if (result.verified == 1) {
        const passwordFromDB = result.password;
        const isMatchPassword = bcrypt.compareSync(password, passwordFromDB);
        if (isMatchPassword) {
          const id = result.user_id;
          var usertoken = jwt.sign({ userEmail: req.body.email }, SECRET_KEY);
          res.status(201);
          res.json({
            status: 201,
            usertoken: usertoken,
            type: result.userType,
            message: "Login Success",
            id: id,
          });
        } else {
          res.status(403);
          res.json({
            status: 403,
            message: "Password dont match",
          });
        }
      } else {
        res.status(402);
        res.json({
          status: 402,
          message: "User not verified",
        });
      }
    } else {
      res.status(401);
      res.json({
        status: 401,
        message: "Email do not match",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      status: 500,
      message: error,
    });
  }
}

module.exports = {
  login,
};
