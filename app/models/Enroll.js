var database = require("../config/dbConfig.js");

var Enroll =database.sequelize.define('Enrolls',{
     //attributes
     enrollId: {
        type: database.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id:{
        type: database.Sequelize.INTEGER,
        allowNull: false,
        require:true,
      },
      year:{
          type:database.Sequelize.DATE,
            allowNull:false,
            require:true
      },
      class_id:{
          type:database.Sequelize.INTEGER,
          allowNull:false,
          require:true
      },
},{
    freezeTableName:true,
    tablesName:"Enrolls",
    paranoid: false,
})
Enroll.sync({force:false})
.then(function(){

})
.catch(function(err){
    console.log(err);
});

module.exports=Enroll;

