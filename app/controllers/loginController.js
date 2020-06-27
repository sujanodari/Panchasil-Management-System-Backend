var user = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";

async function login(req, res) {
  const password = req.body.password;
  try {
    const result = await user.findOne({
      where: { email: req.body.email },
    });
    if (result) {
      try {
        const verified = await user.findOne({
          where: { verified: 1 },
        });
        if (verified) {
          const passwordFromDB = result.password;
          const id = result.user_id;
          const isMatchPassword = bcrypt.compareSync(password, passwordFromDB);
          if (isMatchPassword) {
            var usertoken = jwt.sign({ userEmail: req.body.email }, SECRET_KEY);
            res.json({
              status: true,
              usertoken: usertoken,
              type: result.userType,
              message: "Login Success",
              id: id,
            });
          } else {
            res.json({
              status: false,
              message: "Password do not match",
            });
          }
        } else {
          res.json({
            status: false,
            message: "you are not verified user ifelse",
          });
        }
      } catch (error) {
        console.log(error);
        res.json({
          status: false,
          message: "you are not verified user",
        });
      }
    } else {
      res.json({
        status: false,
        message: "Email do not match",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Email do not match",
    });
  }
}

module.exports = {
  login,
};
