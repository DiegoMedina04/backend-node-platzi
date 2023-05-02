const  bcrypt = require('bcrypt')

async function hashPassword(){
  const myPassword ='admin123'
  const hash =  await bcrypt.hash(myPassword, 10) //el 10 siginifica las veces que va a incriptar la contraseña ejem: la ecripta esa encripta vuelve y alencripta y asi sucesivamente
//  console.log('password ecriptada: ',hash)
}

module.exports={hashPassword}
