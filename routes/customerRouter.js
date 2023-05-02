const express = require('express');
const routerIndex = express.Router();
const customerServices = require('./../services/customerServices');
const services = new customerServices()
const {validatorHandle} = require('./../middlewares/validatorHandler');
const  {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema

}= require('./../schemas/customerSchemas')


routerIndex.get('/', async(req, res)=>{
  try {

    const rta =await services.find()
    res.json(rta)

  } catch (error) {
    res.json(error)
  }
});

routerIndex.post('/',
validatorHandle(createCustomerSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      res.status(201).json(await services.create(body));
    } catch (error) {
      res.json(error);
    }
  }
);



routerIndex.get('/:id',
  validatorHandle(getCustomerSchema , 'params'),
  async(req, res, next)=>{

    try {

      const {id} = req.params;
      const users = await services.findOne(id);
      res.json(users)

    } catch (error) {
      next(error)
    }


});
routerIndex.patch('/:id',
  validatorHandle(getCustomerSchema , 'params'),
  validatorHandle(updateCustomerSchema, 'body'),
  async (req, res, next)=>{
  try {
    const {id} = req.params;
    const {body} =req

    res.status(201).json(await services.update(id, body))

  } catch (error) {
    next(error)
  }
})

routerIndex.delete('/:id',
  validatorHandle(getCustomerSchema , 'params'),
  async (req, res, next)=>{
  try {

    const {id} = req.params
    const rta = await services.delete(id)
    res.json(rta)

  } catch (error) {
    next(error)
  }
})

module.exports = routerIndex
