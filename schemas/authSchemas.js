const Joi = require('joi');
const username = Joi.string()
const password = Joi.string()


const authSchema= Joi.object({
  email:username.required(),
  password:password.required(),
})



module.exports={authSchema}
