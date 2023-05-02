const Joi = require('joi');
const id= Joi.number().integer()
const name = Joi.string()
const image = Joi.string()


const createCategoriesSchema= Joi.object({
  name:name.required(),
  image:image.required(),
})

const updateCategoriesSchema= Joi.object({
  name:name.required(),
  image:image.required(),
})

const getCategoriesSchema= Joi.object({
  id: id.required()
})

module.exports={getCategoriesSchema,updateCategoriesSchema,createCategoriesSchema}
