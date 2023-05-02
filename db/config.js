// archivos de conexion, todo para que se conecte a la base de datosl
const {config }= require('./../config/config.js')

//npm install --save-dev sequelize-cli
//config para correr migraciones

//package.json "migrations:generate": "sequelize-cli migration:generate --name" colocar en los scripts
//sequelize-cli migration:generate --name create-user


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports ={
  development:{
    url: URI,
    dialect :  'postgres',
  },
  production:{
    url: URI,
    dialect :  'postgres',
  }
}
