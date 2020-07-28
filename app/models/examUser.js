var database = require("../config/dbConfig.js");
var ExamUser = database.sequelize.define(
  "ExamUser",
  {
    //attributes
    Id: {
        type: database.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      UserId: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
        require: true,
      },

      ExamId: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
        require: true,
      },
    
  },
  {
    freezeTableName: false,
    tablesName: "ExamUser",
  }
);
ExamUser
  .sync({ force: false })
  .then(function () {})
  .catch(function (err) {
    console.log(err);
  });

module.exports = ExamUser;
