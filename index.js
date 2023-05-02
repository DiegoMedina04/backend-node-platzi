const express = require('express');
const routerApi = require('./routes')
const cors = require('cors');


require('./tokenSign')
//npm init -y
//npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D
//npm install -g npm-check-updates




const {errorLengs, errorHandle, boomErrorHandle,ormErrorHandler} = require('./middlewares/errorHandle')
const {checkApiKey}=require('./middlewares/authHandler')


const app = express();
const port =process.env.PORT|| 3000; //asigne el puerto si viene en una variable de entorno
app.use(express.json()) //hace capturar la informacion que llega por el metodo post, put, putch

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)|| !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
//app.use(cors()); //deja recibir de todos los puertos no solo del 8080
app.use(cors(options)); //solo con esto ya soluciona el problema, lo de arriba es para controlar que origines que quieren que se conecten
 //para que se pueda comunicar desde el frontend


require('./utils/auth')

app.get('/', checkApiKey,(req, res)=>{
  res.send('Hello word');
})

routerApi(app)
//Middleware: siempre despues de haber definido el router

app.use(errorLengs)
app.use(ormErrorHandler)
app.use(boomErrorHandle)
app.use(errorHandle)

app.listen(port, ()=>{
})
