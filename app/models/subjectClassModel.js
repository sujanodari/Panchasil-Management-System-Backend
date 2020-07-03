var database = require("../config/dbConfig.js");
  var subjectClassModel = database.sequelize.define(
    "subjectsClass",
    {
      //attributes
      subclassId:{
        type: database.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      subId: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
      },
      classId: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
      }  
    },
    {
      freezeTableName: true,
      tablesName: "subjectsClass",
    }
  );
  subjectClassModel
    .sync({ force: false })
    .then(function () {})
    .catch(function (err) {
      console.log(err);
    });
  

module.exports = subjectClassModel;
