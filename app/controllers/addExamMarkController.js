var addMarks = require("../models/addMarksModel");
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

async function AddMarks(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    await addMarks.create({
      subject: req.body.subject,
      class: req.body.class,
      section: req.body.section,
      year: req.body.year,
      examType: req.body.examType,
      email: req.body.email,
      studentName: req.body.studentName,
      marks: req.body.marks,
    });
    res.json({
      status: 201,
      message: "Marks  added",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error: " + error,
    });
  }
}



async function getAllExamMarks(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    const result = await addMarks.findAll()
    res.status(200)
    res.json(
      result
    )
  }
  catch (error) {
    res.status(500)
    res.json({
      status: 500,
      message: error
    })
  }
}


async function updateExamMarks(req, res) {

  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    await addMarks.update(
      {
        marks: req.body.marks,
        
        
      },
      {
        where: {
          marksId: req.params.id,
        },
      }
    );
    res.status(201);
    res.json({
      status: 201,
      message: "Score update successfully!",
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

async function getExamMarksById(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {
    const result = await addMarks.findAll({
      where: {
        
        marksId: req.params.id,
          
        
      }
    });

    const data = {
      
      studentName: result[0].studentName,
      email: result[0].email,
      class: result[0].class,
      section: result[0].section,
      year: result[0].year,
      examType: result[0].examType,
      subject: result[0].subject,
      marks: result[0].marks,
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




module.exports = {
    AddMarks,
    getAllExamMarks,
    updateExamMarks,
    getExamMarksById,
    
  };