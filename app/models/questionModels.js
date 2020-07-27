var database = require("../config/dbConfig.js");
var questions = database.sequelize.define(
  "questions",
  {
    //attributes
    questionId: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: database.Sequelize.INTEGER,
      allowNull: false,
      require: true,
    },
    class: {
      type: database.Sequelize.ENUM(
        "PG",
        "Nursery",
        "KG",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
      ),
      allowNull: false,
      require: true,
    },
    section: {
      type: database.Sequelize.ENUM("A", "B", "C", "D"),
      allowNull: false,
      require: true,
    },

    Exam_type: {
      type: database.Sequelize.ENUM(
        "unitTest1",
        "unitTest2",
        "unitTest3",
        "unitTest4",
        "terminalExam1",
        "terminalExam2",
        "terminalExam3",
        "terminalExam4"
      ),
      allowNull: false,
      require: true,
    },

    ExamDate: {
      type: database.Sequelize.DATE,
      allowNull: false,
    },

    questionBank: {
      type: database.Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: false,
    tablesName: "questions",
  }
);
questions
  .sync({ force: false })
  .then(function () {})
  .catch(function (err) {
    console.log(err);
  });

module.exports = questions;
