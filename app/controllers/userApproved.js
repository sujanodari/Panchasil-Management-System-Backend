var user = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";


function notAuthenticated(res) {
  
    res.json({
        status: false,
        message: 'You are not authenticate user',
        code: 404
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
        console.log(error)
        return false
    }
  
  }


  async function getApproved(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
    try {
      const result = await user.findAll({where: 
        {
        verified: 0
      }
    });
    
      res.json(result);
    }catch(error){
      res.json({
        status: false,
        message: error
      });
    }
  
  }
  
  
  async function approveRegister(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
  
    console.log(req.body);
  
    try {
      await user.update(
        {
            verified:1,
        
        },
        {
          where: {
            userId: req.params.id
          }
        }
      );
  
      res.json({
        status: true,
        message: "Verified successfully"
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: error
      });
    }
  }
  module.exports={
    getApproved,
    approveRegister,
    
    
  };  