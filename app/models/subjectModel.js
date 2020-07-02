var database = require("../config/dbConfig.js");
var subjectModel = database.sequelize.define(
  "subjects",
  {
    //attributes
    subId: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    subjectName: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require: true,
    }
    
  },
  {
    freezeTableName: false,
    tablesName: "subjects",
  }
);
subjectModel
  .sync({ force: false })
  .then(function () {})
  .catch(function (err) {
    console.log(err);
  });

module.exports = subjectModel;
