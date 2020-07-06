var Users= require('../models/UserModel');
var Class= require('../models/classModel');
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
 
    var search;
    console.log(req.header.authorization)
  if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
      }
     

      if (!req.body.name===null|undefined){
        search=req.body.name
      }

      if (!req.body.email===null|undefined){
        search=req.body.email
      }


      
    try {
      const result = await Users.findAll({
        order: [["fullName", "ASC"]],
        where:{
            userType: ['Student', 'Staff'],
            verified:[1]},
            $like:"'%"+search+"%'"
      });
      console.log(result)
      res.status(200);
      res.json(result);

    } catch (error) {
     
      res.json({
        status: 500,
        message: error,
      });
    }
  }
  
  module.exports= {
      getallUsers }