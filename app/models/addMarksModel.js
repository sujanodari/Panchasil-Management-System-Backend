var database = require ("../config/dbConfig.js");
var addMarks=database.sequelize.define("addMarks",{
    //attributes
 marksId: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    studentName: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },

    email: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },

    class: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    section: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    year: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    examType: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },

    subject: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    marks: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
   
    
    
    
    
},{
    freezeTableName:false,
    tablesName:"addMarks",
    paranoid: false,

});
addMarks.sync({force:false})
.then(function(){

})
.catch(function(err){
    console.log(err);
});


module.exports=addMarks;