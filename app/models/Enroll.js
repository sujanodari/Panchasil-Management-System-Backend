var database = require("../config/dbConfig.js");
var user = require("./UserModel");
var classes = require("./classModel");

var Enrolls =database.sequelize.define('Enrolls',{
     //attributes
     enrollId: {
        type: database.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      
      year:{
          type:database.Sequelize.DATEONLY,
            allowNull:false,
            require:true
      },
      
},{
    freezeTableName:true,
    tablesName:"Enrolls",
    paranoid: false,
})

user.hasMany(Enrolls);
Enrolls.belongsTo(user);

classes.hasMany(Enrolls);
Enrolls.belongsTo(classes);

Enrolls.sync({force:false})
.then(function(){

})
.catch(function(err){
    console.log(err);
});

module.exports=Enrolls;
