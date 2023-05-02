const { Sequelize } = require('sequelize');
const {config }= require('./../config/config.js')
const setupModels= require('./../db/models')

//3 PASO!!

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//el Sequelize por detras gestiona el pool

const sequelize =new Sequelize (URI,{ //conexion
  dialect :  'postgres',          //'postgres', //base de datos a la que se va a conectar
  loggin:true
})

//cada vez haga una consulta por medio de ORM veremos cual sera el resultado

setupModels(sequelize) //Recibe la conexion

//sequelize.sync(); //leera los modelos y sabra como crear la tabla
//no es recomendable utilizar sync en produccion ya que para eso se utilizan las migraciones

module.exports= sequelize
