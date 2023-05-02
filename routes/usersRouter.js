const express = require('express');
const routerIndex = express.Router();
const userServices = require('./../services/userServices')
const services = new userServices()
const {validatorHandle}= require('./../middlewares/validatorHandler')
const {createUserSchema, updateUserSchema, getUserSchame}=require('./../schemas/usersSchemas')



routerIndex.get('/', async(req, res)=>{

  try {

    const products=  await services.find()
    res.json(products)

  } catch (error) {
    res.json(error.message)
  }
});


routerIndex.get('/:id',
  validatorHandle(getUserSchame , 'params'),
  async(req, res, next)=>{

    try {

      const {id} = req.params;
      const users = await services.findOne(id);
      res.json(users)

    } catch (error) {
      next(error)
    }


});

routerIndex.post('/',
    validatorHandle(createUserSchema,'body'),
    async (req, res, next)=>{
    try {

      const body = req.body;

      const createUser = await services.create(body);
      res.json(createUser)

    } catch (error) {
      next(error)
    }
})


routerIndex.patch('/:id',
  validatorHandle(getUserSchame, 'params'),
  validatorHandle(updateUserSchema, 'body'),

  async (req, res, next)=>{

  try {

    const {id}= req.params;
    const body = req.body;
    const updateUser= await services.update(id, body)
    res.json(updateUser)

  } catch (error) {
    next(error)
  }
})

routerIndex.delete('/:id',
  validatorHandle(getUserSchame, 'params'),
  async (req, res, next)=>{

  try {

    const {id} = req.params

    const deleteUser = await services.delete(id)

    res.json({deleteUser})

  } catch (error) {
    next(error)
  }

})
module.exports=routerIndex;
