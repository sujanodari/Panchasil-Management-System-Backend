var jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";
var character = require("../models/characterModel");

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



  async function addCharacter(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
      }
      try {
        await character.create({
          name: req.body.name,
          parentName: req.body.parentName,
          address: req.body.address,
          wardNo: req.body.wardNo,
          dateFrom: req.body.dateFrom,
          dateTo: req.body.dateTo,
          heldYear: req.body.heldYear,
          grade: req.body.grade,
          seeReg: req.body.seeReg,
          seeSymbol: req.body.seeSymbol,
          dob: req.body.dob,
        });
        res.status(201);
        res.json({
          status: 201,
          message: "Character details  added",
        });
      } catch (error) {
        res.status(500);
        res.json({
          status: 500,
          message: "Error: " + error,
        });
      }
  }
  
  module.exports = {
    addCharacter,
  };