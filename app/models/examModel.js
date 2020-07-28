var database = require("../config/dbConfig.js");

var Exam =database.sequelize.define('Exams',{
     //attributes
     ExamId: {
        type: database.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Exam_type:{
        type: database.Sequelize.ENUM("unitTest1","unitTest2","unitTest3","unitTest4",
                              "terminalExam1","terminalExam2","terminalExam3","terminalExam4"),
        allowNull: false,
        require:true,
      },
     ExamDate: {
        type: database.Sequelize.DATE,
        allowNull: false,}
       
     
},{
    freezeTableName:false,
    tablesName:"Exams",
    paranoid: false,
})
Exam.sync({force:false})
.then(function(){

})
.catch(function(err){
    console.log(err);
});

module.exports=Exam;
