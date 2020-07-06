var database = require("../config/dbConfig.js");

var classes =database.sequelize.define('Classes',{
     //attributes
     classId: {
        type: database.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      class:{
        type: database.Sequelize.ENUM('PG', 'Nursery','KG', '1','2','3','4','5','6','7','8','9','10'),
        allowNull: false,
        require:true,
      },
      section:{
            type:database.Sequelize.ENUM('A','B','C','D'),
            allowNull:false,
            require:true
      },
      routine:{
        type: database.Sequelize.TEXT,
      allowNull: true,
      require:false,
      defaultValue:null
      }

},{
    freezeTableName:true,
    tablesName:"Classes",
    paranoid: false,
})
classes.sync({force:false})
.then(function(){

})
.catch(function(err){
    console.log(err);
});

module.exports=classes;

