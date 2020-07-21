var database = require("../config/dbConfig.js");

var assignment = database.sequelize.define(
  "assignments",
  {
    //attributes
    assignmentId: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    class: {
      type: database.Sequelize.TEXT,
      allowNull: true,
      require: false,
      defaultValue: null,
    },
    section: {
      type: database.Sequelize.TEXT,
      allowNull: true,
      require: false,
      defaultValue: null,
    },
    submissiondate: {
      type: database.Sequelize.DATE,
      allowNull: false,
      require: true,
    },
    title: {
      type: database.Sequelize.TEXT,
      allowNull: true,
      require: false,
      defaultValue: null,
    },
    image: {
      type: database.Sequelize.TEXT,
      allowNull: true,
      require: false,
      defaultValue: null,
    },
  },
  {
    freezeTableName: true,
    tablesName: "assignments",
    paranoid: false,
  }
);
assignment
  .sync({ force: false })
  .then(function () {})
  .catch(function (err) {
    console.log(err);
  });

module.exports = assignment;
