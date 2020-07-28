var Activities = require("../models/activitiesModel");
var jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

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

async function addActivities(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    await Activities.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      image: req.body.image,
    });
    res.json({
      status: 201,
      message: "activities  added",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error: " + error,
    });
  }
}
async function getallActivities(req, res) {
  try {
    const result = await Activities.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(result);
  } catch (error) {
    res.json({
      status: 500,
      message: error,
    });
  }
}

async function deleteActivities(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {
    Activities.destroy({
      where: { activitiesId: req.params.id },
    });

    res.status(201);
    res.json({
      status: 201,
      message: "activities deleted",
    });
  } catch (err) {
    res.status(500);
    res.json({
      status: 500,
      message: err,
    });
  }
}
module.exports = {
  addActivities,
  getallActivities,
  deleteActivities,
};
