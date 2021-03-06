var database = require("../config/dbConfig.js");
var news = database.sequelize.define(
  "news",
  {
    //attributes
    newsId: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require: true,
    },
    description: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require: true,
    },

    name: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require: true,
    },

    image: {
      type: database.Sequelize.TEXT,
      allowNull: true,
    },
    
  },
  {
    freezeTableName: false,
    tablesName: "news",
  }
);
news
  .sync({ force: false })
  .then(function () {})
  .catch(function (err) {
    console.log(err);
  });

module.exports = news;
