var database = require ("../config/dbConfig.js");
var character=database.sequelize.define("character",{
    //attributes
    characterId: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    parentName: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    address: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    wardNo: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    dateFrom: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    dateTo: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    heldYear: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    grade: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    seeReg: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    seeSymbol: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    dob: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    
},{
    freezeTableName:false,
    tablesName:"character",
    paranoid: false,

});
character.sync({force:false})
.then(function(){

})
.catch(function(err){
    console.log(err);
});


module.exports=character;