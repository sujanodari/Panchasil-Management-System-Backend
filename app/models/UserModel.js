var database = require ("../config/dbConfig.js");
var user=database.sequelize.define("Users",{
    //attributes
 userId: {
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
    address: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    date: {
      type: database.Sequelize.DATE,
      allowNull: false,
      require:true,
    },
    contactNumber: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    email: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    gender: {
      type: database.Sequelize.ENUM('Male', 'Female', 'Others'),
      allowNull: false,
      require:true,
    },
    attendance: {
      type: database.Sequelize.INTEGER,
      allowNull: false,
      defaultValue:0,
    },
    parentName: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    parentAddress: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    parentContact: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    citizenshipNo: {
      type: database.Sequelize.TEXT,
      allowNull: false,
    },
    userType: {
      type: database.Sequelize.ENUM('Admin','Staff', 'Student'),
      allowNull: false,
    },
    amount: {
      type: database.Sequelize.INTEGER,
      allowNull: true,
      defaultValue:0,
    },
    password: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require:true,
    },
    image: {
      type: database.Sequelize.TEXT,
      allowNull: true,
    },
    verified: {
      type: database.Sequelize.INTEGER,
      allowNull: false,
      defaultValue:0,
    },
    register: {
      type: database.Sequelize.DATE,
      allowNull: false,
      defaultValue:Date.now,
    },
    securityAnswer: {
      type: database.Sequelize.TEXT,
      allowNull: false,
    }
    
},{
    freezeTableName:true,
    tablesName:"Users",
    paranoid: true,

});
user.sync({force:false})
.then(function(){

})
.catch(function(err){
    console.log(err);
});


module.exports=user;