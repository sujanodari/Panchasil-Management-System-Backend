var user = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const result = await user.findOne({
      where: { email: req.body.email }
    });
    if (result) {
      res.json({
        status: false,
        message: "Email already exit"
      });
    } else {
      user.create({
        fullName: req.body.fullName,
        address: req.body.address,
        date: req.body.date,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        gender: req.body.gender,
        attendance: req.body.attendance,
        parentName: req.body.parentName,
        parentAddress: req.body.parentAddress,
        parentContact: req.body.parentContact,
        citizenshipNo: req.body.citizenshipNo,
        userType: req.body.userType,
        password: hashedPassword,
        securityAnswer: req.body.securityAnswer,
      });

      res.json({
        status: true,
        message: "User Register Successfully!"
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Fail to register User"
    });
  }
}






module.exports = {
  register,

};