
var Users= require('../models/UserModel');
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

async function getallUsers(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
      }

    try {
      const result = await Users.findAll({
        order: [["fullName", "ASC"]],
        where:{userType: ['Student', 'Staff'],verified:[1]}
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


  async function getallUsersStaff(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
      }

    try {
      const result = await Users.findAll({
        order: [["fullName", "ASC"]],
        where:{userType: ['Staff'], verified:[1]}
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


  async function getallUsersStudent(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
      }

    try {
      const result = await Users.findAll({
        order: [["fullName", "ASC"]],
        where:{userType: ['Student'],verified:[1]}
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


  // async function getUserById(req,res){
  //   if (authenticate(req.headers.authorization) === false) {
  //     notAuthenticated(res);
  //     return;
  //   }

  //   try{
  //     const result =  await Users.findOne({
  //       where:{userId:req.params.id}
  //     });
  //     res.status(201)
  //     res.json(result)
  //   }
  //   catch(err){
  //     console.log(err)
  //     res.status(500)
  //     res.json({
  //       status:500,
  //       message:err
  //     })
  //   }
   

  // }

  module.exports= {
      getallUsers,
      getallUsersStaff,
      getallUsersStudent,
      // getUserById
  }