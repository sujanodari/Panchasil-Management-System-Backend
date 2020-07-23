var notices = require("../models/noticeModel");
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
async function addNotice(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  //console.log(req.body)
  try {
    await notices.create({
      title: req.body.title,
      description: req.body.description,
      name: req.body.name,
      image: req.body.image,
    });
    res.status(201);
    res.json({
      status: 201,
      message: "Notice  added",
    });
  } catch (error) {
    res.status(500);
    res.json({
      status: 500,
      message: "Error: " + error,
    });
  }
}

async function getallNotice(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    const result = await notices.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(result);
  } catch (error) {
    res.status(401);
    res.json({
      status: 401,
      message: error,
    });
  }
}

async function updateNotice(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  //console.log(req.body);
  try {
    await notices.update(
      {
        title: req.body.title,
        description: req.body.description,
        name: req.body.name,
      },
      {
        where: {
          noticeId: req.params.id,
        },
      }
    );
    res.status(201);
    res.json({
      status: 201,
      message: "Notice Update successfully!",
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

async function getNoticeById(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {
    const result = await notices.findAll({
      where: {
        
        noticeId: req.params.id,
      }
    });

    const data = {
      
      title: result[0].title,
      description: result[0].description,
      name: result[0].name,
      image: result[0].image,
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



async function updateNoticeImage(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  //console.log(req.body);
  try {
    await notices.update(
      {
        image: req.body.image,
      },
      {
        where: {
          noticeId: req.params.id,
        },
      }
    );
    res.json({
      status: 201,
      message: "Notices Image Update successfully!",
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
  addNotice,
  getallNotice,
  updateNotice,
  getNoticeById,
  updateNoticeImage,
};
