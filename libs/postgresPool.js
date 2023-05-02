const {Pool }= require('pg') //para conexion a db mas segura npm i pg
const {config }= require('./../config/config.js')

//PROTEGER DATOS
// env: process.env.NODE_ENV || 'dev',
// port: process.env.PORT || 3000,
// dbUser:  process.env.DB_USER,
// dbPassword:  process.env.DB_PASSWORD,
// dbHost:  process.env.DB_HOST,
// dbName:  process.env.DB_NAME,
// dbPort:  process.env.DB_PORT,
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({ connectionString: URI });


  // const pool = new Pool( {
  //   host:'localhost',
  //   port: 5432,
  //   user: 'diego',
  //   password: 'admin123',
  //   database: 'my_store'
  // })


module.exports = pool
