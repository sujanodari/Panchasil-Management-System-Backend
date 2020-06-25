var user = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";

async function login(req, res) {
  console.log(req.body.password + req.body.email);
  const password = req.body.password;
  try {
    const result = await user.findOne({
      where: { email: req.body.email },
    });

    if (result) {
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
          // accessToken:
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJyYW1AZ21haWwuY29tIiwiaWF0IjoxNTkzMTA3MTEwfQ.jU8-NdkZ_dXrzlYmTxPYqcQJKjkuvlnsajKi_n3dEZM",
          // userType: "Admin",
          // message: "Login Success",
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
