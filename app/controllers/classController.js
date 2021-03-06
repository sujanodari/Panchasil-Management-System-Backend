var Classes = require("../models/classModel");
var Enroll = require("../models/Enroll");
var jwt = require("jsonwebtoken");
const user = require("../models/UserModel");


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

async function enrollStudent(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {
    const result = await user.findOne({
      where: { userId: req.params.id },
    });
    if (result) {
      try {
        const result = await Classes.findOne({
          where: [{ class: req.body.class, section: req.body.section }],
        });

        if (result) {
          let ClassClassId = result.dataValues.classId;

          try {
            const result = await Enroll.findOne({
              where: { UserUserId: req.params.id },
            });
            if (result) {
              res.status(404);
              res.json({
                status: 404,
                message: "Student already Enrolled",
              });
            } else {
              Enroll.create({
                ClassClassId: ClassClassId,
                UserUserId: req.params.id,
                year: req.body.year,
              });

              res.status(201);
              res.json({
                status: 201,
                message: "Student Enrolled",
              });
            }
          } catch (err) {
            res.status(500);
            res.json({
              status: 500,
              message: err,
            });
          }
        } else {
          res.status(403);
          res.json({
            status: 403,
            message: "Class not found",
          });
        }
      } catch (err) {
        res.status(500);
        res.json({
          status: 500,
          message: err,
        });
      }
    } else {
      res.status(405);
      res.json({
        status: 405,
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500);
    res.json({
      status: 500,
      message: err,
    });
  }
}



async function addclass(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    const result = await Classes.findOne({
      where: [{ section: req.body.section, class: req.body.class }],
    });

    if (result) {
      res.status(403);
      res.json({ status: 403, message: "Class already exist" });
    } else {
      Classes.create({
        class: req.body.class,
        section: req.body.section,
      });

      res.status(201);
      res.json({ status: 201, message: "Class added" });
    }
  } catch (error) {
    res.status(500);
    res.json({
      status: 500,
      message: error,
    });
  }
}

async function getAllEnrollsByClass(req,res){
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try{
    const result=await Enroll.findAll({
      where:[{ClassClassId:req.params.id}]
    })
    res.status(201)
    res.json(result)
  }catch(err){
    res.status(500)
    res.json({
      status:500,
      message:err
    })
  }

  
}

async function getallEnrolls(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {
    const result = await Enroll.findAll({});
    res.status(201);
    res.json(result);
  } catch (error) {
    res.json({
      status: 500,
      message: error,
    });
  }
}

async function getStudentClass(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  const result = await Enroll.findOne({
    where: { UserUserId: req.params.id },
  });
  if (result) {
    let ClassClassId = result.dataValues.ClassClassId;
    let year = result.dataValues.year;

    try {
      const result = await Classes.findOne({
        where: { classId: ClassClassId },
      });
      res.status(201);
      res.json({
        status: 201,
        result: result,
        year: year,
      });
    } catch (err) {
      res.status(500);
      res.json({
        status: 500,
        message: err,
      });
    }
  } else {
    res.status(404);
    res.json({
      status: 404,
      message: "Class not found for this user",
    });
  }
}

async function getallClass(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {
    const result = await Classes.findAll({});
    res.status(201);
    res.json(result);
  } catch (error) {
    res.json({
      status: 500,
      message: error,
    });
  }
}

async function deleteEnroll(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    Enroll.destroy({
      where: { enrollId: req.params.id },
    });
    res.status(201);
    res.json({
      status: 201,
      message: "Enroll deleted",
    });
  } catch (err) {
    res.status(500);
    res.json({
      status: 500,
      message: err,
    });
  }
}

async function deleteClass(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    Classes.destroy({
      where: { classId: req.params.id },
    });

    Enroll.destroy({
      where: { class_id: req.params.id },
    });
    res.status(201);
    res.json({
      status: 201,
      message: "Class Deleted with id " + req.params.id,
    });
  } catch (err) {
    res.status(500);
    res.json({
      status: 500,
      message: err,
    });
  }
}

async function updateRoutine(req, res) {
  console.log(req.body.routine);
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    await Classes.update(
      {
        routine: req.body.routine,
      },
      {
        where: {
          classId: req.params.id,
        },
      }
    );
    res.status(201);
    res.json({
      status: 201,
      message: "Routine update successfully!",
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

async function deleteRoutine(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  if (req.params.id === null) {
    res.status(403);
    res.json({
      status: 403,
      message: "Class ID is not provided",
    });
  } else {
    const result=Classes.findOne(
      {
        where: { classId: req.params.id },
      }
    )

    if(result){
      Classes.update({
        routine:null
      },
      {
        where: {
          classId: req.params.id,
        },
      }
      )
      res.status(200);
      res.json({ status: 200, message: "successfully deleted" });

    }else{
      res.status(404)
      res.json({
        status:404,
        message:'Class not found'
      })
    }
  }
}

async function addFees (req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
try 
{

  await Classes.update(

    {
      
      eca:req.body.eca,
      trans:req.body.trans,
      tuition:req.body.tuition,
    },
    {
      where: {
        classId: req.params.id,
      },
    }
  );
  res.status(201);
  res.json({
    status: 201,
    message: "Fee added successfully!",
  });
}
catch (error) {
  res.status(500);
  res.json({
    status: 500,
    message: error,
  });
}

}
async function getClassById (req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;

  }
  try{

    const result = await Classes.findOne({
      where: {
        classId: req.params.id
      }
    })
   if (result) {
     res.status(200)
     res.json(result)
   }
   else {
    res.status(404)
    res.json({
      status: 404,
      message: "class not found "
    })
   }
  }
  catch (error) {
    res.status(500);
  res.json({
    status: 500,
    message: error,
  });
  }
}



async function updateClass(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  //console.log(req.body);
  try {
    await Classes.update(
      {
        class: req.body.class,
        section: req.body.section,
        routine: req.body.routine,
        tuition: req.body.tuition,
        eca: req.body.eca,
        trans: req.body.trans,
       
        
      },
      {
        where: {
          classId: req.params.id,
        },
      }
    );
    res.json({
      status: 201,
      message: "Class Update successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: error,
    });
  }
}

module.exports = {
  addclass,
  getallClass,
  enrollStudent,
  getallEnrolls,
  getStudentClass,
  deleteClass,
  deleteEnroll,
  updateRoutine,
  deleteRoutine,
  addFees,
  getClassById, 
  getAllEnrollsByClass,
  updateClass,

};
