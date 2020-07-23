var subject = require("../models/subjectModel.js");
var subjectClass = require("../models/subjectClassModel.js");
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

async function addSubject(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    await subject.create({
      subjectName: req.body.subjectName
    });
    res.status(201);
    res.json({
      status: 201,
      message: "Subject  added",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error: " + error,
    });
  }
}

async function getallSubject(req, res) {
  try {
    const result = await subject.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200);
    res.json(result);
  } catch (error) {
    res.json({
      status: 500,
      message: error,
    });
  }
}

async function deleteSubject(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {
    await subjectClass.destroy(
      {
        where: {
          subId: req.params.id,
        },
      }
    );

  } catch (error) {

  }
  //console.log(req.body);
  try {
    await subject.destroy(
      {
        where: {
          subId: req.params.id,
        },
      }
    );
    res.status(204);
    res.json({
      status: 204,
      message: "Subject Deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: error,
    });
  }
}

async function addSubjectClass(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    await subjectClass.create({
      subId: req.body.subId,
      classId:req.body.classId
    });
    res.status(201);
    res.json({
      status: 201,
      message: "Subject added for class",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error: " + error,
    });
  }
}


async function getallSubjectClass(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {
    const result = await subjectClass.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200);
    res.json(result);
  } catch (error) {
    res.json({
      status: 500,
      message: error,
    });
  }
}



async function getStudentSubject(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
// id=classid
  try {
    const result = await subjectClass.findAll({
      where: { classId: req.params.id}
    });
    res.status(200);
    res.json(result);
  } catch (error) {
    res.json({
      status: 500,
      message: error,
    });
  }
}

async function deleteSubjectClass(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  //console.log(req.body);
  try {
    await subjectClass.destroy(
      {
        where: {
          subclassId: req.params.id,
        },
      }
    );
    res.status(204);
    res.json({
      status: 204,
      message: "Subject Deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: error,
    });
  }
}

async function getSubjectById(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {
    const result = await subject.findAll({
      where: {
        
        subId: req.params.id,
      }
    });

    const data = {
      
      subjectName: result[0].subjectName,
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


async function updateSubject(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  //console.log(req.body);
  try {
    await subject.update(
      {
        subjectName: req.body.subjectName,
        
      },
      {
        where: {
          subId: req.params.id,
        },
      }
    );
    res.json({
      status: 201,
      message: "Subject Update successfully!",
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
  addSubject,
  getallSubject,
  deleteSubject,
  addSubjectClass,
  getallSubjectClass,
  deleteSubjectClass,
  getStudentSubject,
  getSubjectById,
  updateSubject,
};
