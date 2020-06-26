var user = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";

async function forgetPassword(req, res, next) {
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  user
    .findOne({
      where: { email: req.body.email },
    })
    .then((User) => {
      if (User == null) {
        res.status(401);
        res.json({
          status: 401,
          message: "User not registered",
        });
      } else if (!(req.body.securityAnswer === User.securityAnswer)) {
        res.status(403);
        res.json({
          status: 403,
          message: "Security question donot match",
        });
      } else {
        user
          .update(
            { password: hashedPassword },
            { where: { email: req.body.email } }
          )
          .then((result) => {
            res.status(201);
            res.json({
              status: 201,
              message: "Password changed",
            });
          })
          .catch(next);
      }
    });
}

module.exports = {
  forgetPassword,
};
