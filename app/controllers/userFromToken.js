const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

module.exports.userFromToken = (req, res, next) => {
  const SECRET_KEY = "secret_key";
  let data;
  data = jwt.verify(req.headers.authorization, SECRET_KEY);
  User.findOne({ where: { email: data.userEmail } }).then((user) => {
    res.status(201);
    res.json(user);
  });
};
