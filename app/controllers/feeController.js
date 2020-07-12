var Fees = require("../models/feeModel");
const SECRET_KEY = "secret_key";
var jwt = require("jsonwebtoken");

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
  async function addFee(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
    try {

      Fees.create({
         fullName: req.body.fullName,
         class: req.body.class,
         section: req.body.section,
         tuition: req.body.tuition,
         eca: req.body.eca,
         trans: req.body.trans,
         examfee: req.body.examfee,
         lastdue: req.body.lastdue
      });
      res.status(201);
      res.json({ status: 201, message: "Fees added" });
    }
     catch (error) {
      console.log (error)
      res.status(500);
      res.json({
        status: 500,
        message: error,
      });
    }
  }

  async function getFee(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
  
    try {
      const result = await Fees.findAll({});
      res.status(201);
      res.json(result);
    } catch (error) {
      res.json({
        status: 500,
        message: error,
      });
    }
  }

  
  async function getFeeById(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
  
    try {
      const result = await Fees.findAll({
        where: {
          
            feesId: req.params.id,
            
          
        }
      });
  
      const data = {
        
        fullName: result[0].fullName,
        class: result[0].class,
        section: result[0].section,
        tuition: result[0].tuition,
        eca: result[0].eca,
        trans: result[0].trans,
        examfee: result[0].examfee,
        lastdue: result[0].lastdue

        };
  
  console.log(data)
      res.status(201)
      res.json(data);
    } catch (error) {
      res.status(500)
      res.json({
        status: 500,
        message: error
      });
    }
  }


  module.exports= {
    addFee, getFee, getFeeById }