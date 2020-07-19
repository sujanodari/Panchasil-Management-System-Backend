var database = require("../config/dbConfig.js");

//username class section fees exam fee last due 
var fees =database.sequelize.define('Fees',{


    //attributes
    feesID:{
        type: database.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

    fullName: {
        type: database.Sequelize.TEXT,
        allowNull: false,
        require:true,
      },

      email: {
        type: database.Sequelize.TEXT,
        allowNull: false,
        require:true,
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

     tuition:{
       type: database.Sequelize.INTEGER,
       allowNull: false,
       
     },
     eca:{
       type: database.Sequelize.INTEGER,
       allowNull: false,
       
     },
     trans:{
       type: database.Sequelize.INTEGER,
       allowNull: true,
 
     },
     examfee:{
        type: database.Sequelize.INTEGER,
        allowNull: true,
    
     },
     lastdue:{
     type: database.Sequelize.INTEGER,
     allowNull: true,
  }
    },{
   freezeTableName:false,
   tablesName:"Fees",
   paranoid: false,
})
fees.sync({force:false})
.then(function(){

})
.catch(function(err){
   console.log(err);
});

module.exports=fees;
