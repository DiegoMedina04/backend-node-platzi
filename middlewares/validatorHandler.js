const boom = require('@hapi/boom');

function validatorHandle(schema, property){

  return ( req , res, next)=>{
    const data = req[property]//con el req porque no se sabe que clase de peticion llege. get, post etc

    const {error} = schema.validate(data, { abortEarly: false }) //{ abortEarly: false } para que mande todos los errores de una sola vez, sin eso mandara uno por uno

    if(error){
      next(boom.badRequest(error))
    }

    next()
  }

}

module.exports = {validatorHandle}
