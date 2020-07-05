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

  async function getUserById(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
  
    try {
      const result = await Users.findAll({
        where: {
          
            userId: req.params.id,
            
          
        }
      });
  
      const data = {
        
        fullName: result[0].fullName,
        address: result[0].address,
        contactNumber: result[0].contactNumber,
        email: result[0].email,
        parentName: result[0].parentName,
        parentAddress: result[0].parentAddress,
        parentContact: result[0].parentContact,
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

  async function updateUserDetails(req, res) {

    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
    try {
      await Users.update(
        {
          fullName: req.body.fullName,
          address: req.body.address,
          contactNumber: req.body.contactNumber,
          email: req.body.email,
          parentName: req.body.parentName,
          parentAddress: req.body.parentAddress,
          parentContact: req.body.parentContact,
          
        },
        {
          where: {
              userId: req.params.id,
          },
        }
      );
      res.status(201);
      res.json({
        status: 201,
        message: "Teacher details update successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({
        status: 500,
        message: error,
      });
    }
  }

  async function deleteUser(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
    if (req.params.id === null) {
      res.status(403);
      res.json({
        status: 403,
        message: "ID is not provided"
      });
    } else {
      Users.destroy({
        where: {
         
            userId: req.params.id ,
            
  
        }
      })
        .then(function (result) {
          if (result === 0) {
            res.status(404);
            res.json({
              status: 404,
              message: "user not found"
            });
          } else {
          }
          res.status(200);
          res.json({ status: 200, message: "successfully deleted" });
        })
        .catch(function (err) {
          console.log(error);
          res.status(500)
          res.json({
            status: 500,
            message: error
          });
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


 

  module.exports= {
      getallUsers,
      getallUsersStaff,
      getallUsersStudent,
      updateUserDetails,
      deleteUser,
      getUserById,
  }