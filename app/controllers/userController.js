var jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";
const bcrypt = require("bcryptjs");

var Users = require("../models/UserModel");
var classes = require("../models/classModel");
var Enrolls = require("../models/Enroll");
const mySeq = require("../config/dbConfig");

Users.hasMany(Enrolls);
Enrolls.belongsTo(Users);

classes.hasMany(Enrolls);
Enrolls.belongsTo(classes);

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
        date: result[0].date,
        contactNumber: result[0].contactNumber,
        email: result[0].email,
        gender: result[0].gender,
        attendance: result[0].attendance,
        parentName: result[0].parentName,
        parentAddress: result[0].parentAddress,
        parentContact: result[0].parentContact,
        citizenshipNo: result[0].citizenshipNo,
        password: result[0].password,
        amount:result[0].amount,
        userType:result[0].userType,
        securityAnswer:result[0].securityAnswer,
        image:result[0].image,
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
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
    try {
      await Users.update(
        {
          fullName: req.body.fullName,
          address: req.body.address,
          date: req.body.date,
          contactNumber: req.body.contactNumber,
          email: req.body.email,
          gender:  req.body.gender,
          attendance:req.body.attendance,
          parentName: req.body.parentName,
          parentAddress: req.body.parentAddress,
          parentContact: req.body.parentContact,
          amount:req.body.amount,
          citizenshipNo: req.body.citizenshipNo,
          password: hashedPassword,
          userType:req.body.userType,
          securityAnswer:req.body.securityAnswer,
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

  async function addAttendence(req, res) {

    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
    try {
      const result= await Users.findOne({
        where:{userId:req.params.id}
      })
      if(result){
        Users.update({
          attendance:result.attendance+1
        },
        {where:[{
          userId:req.params.id,
          userType:'Student'
        }]})
        res.status(200)
        res.json({
          status:200,
          message:"Attendence added"
        })
      }else{
        res.status(404)
        res.json({
          status:404,
          message:'User Not found'
        })
      }
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({
        status: 500,
        message: error,
      });
    }
  }

  async function subAttendence(req, res) {

    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
    try {
      const result= await Users.findOne({
        where:{userId:req.params.id}
      })
      if(result){
        Users.update({
          attendance:result.attendance-1
        },
        {where:[{
          userId:req.params.id,
          userType:'Student'
        }]})
        res.status(200)
        res.json({
          status:200,
          message:"Attendence subtracted"
        })
      }else{
        res.status(404)
        res.json({
          status:404,
          message:'User Not found'
        })
      }
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


  async function updateProfilePicture(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
   
    try {
      await Users.update(
        {
          image: req.body.image,
        },
        {
          where: {
            userId: req.params.id,
          },
        }
      );
      res.json({
        status: 201,
        message: "Profile Picture Update successfully!",
      });
    } catch (error) {
     
      res.json({
        status: 500,
        message: error,
      });
    }
  }

  async function getUserClassById(req, res) {
    if (authenticate(req.headers.authorization) === false) {
      notAuthenticated(res);
      return;
    }
    mySeq.sequelize
      .query(
        `select * from  enrolls e 
           inner join Users u ON u.userId = e.UserUserId 
           inner join classes c ON c.classId=e.ClassClassId where u.userId =:uId`,
        {
          replacements: { uId: req.params.id },
          type: mySeq.sequelize.QueryTypes.SELECT,
        }
      )
      .then((result) => {
        const data = {
          userId: result[0].userId,
          fullName: result[0].fullName,
          address: result[0].address,
          contactNumber: result[0].contactNumber,
          email: result[0].email,
          gender: result[0].gender,
          userType: result[0].userType,
          classId: result[0].classId,
          class: result[0].class,
          section: result[0].section,
          year: result[0].year,
          tuition: result[0].tuition,
          eca: result[0].eca,
          trans: result[0].trans,
        
          UserUserId: result[0].UserUserId,
          ClassClassId: result[0].ClassClassId,
        };
  
        res.json(data);
      })
      .catch((err) => {
        res.json({
          status: false,
          message: "Error: " + err,
        });
      });
  }

  module.exports= {
      getallUsers,
      getallUsersStaff,
      getallUsersStudent,
      updateUserDetails,
      deleteUser,
      getUserById,
      addAttendence,
      subAttendence,
      updateProfilePicture,
      getUserClassById,
  }