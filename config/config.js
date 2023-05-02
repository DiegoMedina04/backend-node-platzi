

require('dotenv').config();

//npm i dotenv automaticamente leera el archivo .env que es para la config

//npm install --save sequelize
//npm install --save pg-hstore para sequelize serialice los datos que viene de postegres



//Son las variables de entorno que se cargan para el servidor con el dotenv lo buscara sola

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET
}
module.exports= {config}
