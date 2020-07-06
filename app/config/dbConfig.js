require("dotenv").config();
var Sequelize = require("sequelize");
//using dot env for database credintals

const op = Sequelize.Op;
const operatorsAliases = {
    $eq: op.eq,
	$or: op.or,
	$like: op.like,
  	$not: op.not
}
var sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
	host: process.env.DB_HOST,
    dialect: "mysql",
	logging:false,
	operatorsAliases
});


sequelize.authenticate().then(
	function(){
//authenticate
})
.catch(
	function(err){
		//next(err);
});





module.exports={
    Sequelize,sequelize
}
