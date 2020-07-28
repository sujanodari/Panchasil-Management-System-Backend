var database = require("../config/dbConfig.js");
var activities = database.sequelize.define(
  "activities",
  {
    //attributes
    activitiesId: {
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
    date: {
        type: database.Sequelize.DATE,
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
    tablesName: "activities",
  }
);
activities
  .sync({ force: false })
  .then(function () {})
  .catch(function (err) {
    console.log(err);
  });

module.exports = activities;
