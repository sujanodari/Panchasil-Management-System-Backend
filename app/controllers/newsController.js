var news = require("../models/newsModel.js");
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

async function addNews(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  try {
    await news.create({
      title: req.body.title,
      description: req.body.description,
      name: req.body.name,
      image: req.body.image,
    });
    res.json({
      status: 201,
      message: "news  added",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error: " + error,
    });
  }
}

async function getallNews(req, res) {
  try {
    const result = await news.findAll({
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

async function updateNews(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  //console.log(req.body);
  try {
    await news.update(
      {
        title: req.body.title,
        description: req.body.description,
        name: req.body.name,
      },
      {
        where: {
          newsId: req.params.id,
        },
      }
    );
    res.json({
      status: 201,
      message: "News Update successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: error,
    });
  }
}


async function getNewsById(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }

  try {
    const result = await news.findAll({
      where: {
        
        newsId: req.params.id,
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


async function updateNewsImage(req, res) {
  if (authenticate(req.headers.authorization) === false) {
    notAuthenticated(res);
    return;
  }
  //console.log(req.body);
  try {
    await news.update(
      {
        image: req.body.image,
      },
      {
        where: {
          newsId: req.params.id,
        },
      }
    );
    res.json({
      status: 201,
      message: "News Image Update successfully!",
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
  addNews,
  getallNews,
  updateNews,
  getNewsById,
  updateNewsImage,
  
};
