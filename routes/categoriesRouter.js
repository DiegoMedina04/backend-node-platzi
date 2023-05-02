const express = require('express');
const routerIndex = express.Router()
const productsService = require('./../services/categoryServices')
const  service =new productsService()
const passport = require('passport')
const {validatorHandle}= require('./../middlewares/validatorHandler')
const { checkRoles}= require('./../middlewares/authHandler')
const {getCategoriesSchema,updateCategoriesSchema,createCategoriesSchema} = require('./../schemas/categoriesSchemas')



routerIndex.get('/',
  passport.authenticate('jwt', {session: false}),
  //checkRoles('admin', 'customer'), quiero que todos puedan ver las categorias entonces no coloco la validacion
  async (req, res, next)=>{
  try {

    const categoriesProducts = await service.find()

    res.json(categoriesProducts)

  } catch (error) {
    next(error)
  }
});

routerIndex.get('/id/product/:idCategoria',
  passport.authenticate('jwt', {session:false}),
  checkRoles('admin', 'customer'),
  validatorHandle(getCategoriesSchema, 'params'),
  async (req, res, next)=>{

  try {

    const {idCategoria} = req.params;

    const categories = await service.findOne(idCategoria)

    res.json(categories);

  } catch (error) {
    next(error)
  }
});

routerIndex.post('/',

  passport.authenticate('jwt', {session:false}),
  checkRoles('admin'),
  validatorHandle(createCategoriesSchema, 'body'),
  async (req, res, next)=>{
  try {

    const {body} = req;

    const productCreate = await service.create(body)
    res.json(productCreate)

  } catch (error) {
    next(error)
  }
})


routerIndex.patch('/:idCategoria',

  passport.authenticate('jwt', {session:false}),
  validatorHandle(getCategoriesSchema, 'params'),
  validatorHandle(updateCategoriesSchema, 'body'),
  async  (req, res, next)=>{
  try {

    const {idCategoria}= req.params;
    const product = req.body;

    const productUpdate= await service.update(idCategoria, product)

    res.json(productUpdate)

  } catch (error) {
    next(error)
  }
});


routerIndex.delete('/:idCategoria',
    passport.authenticate('jwt', {session:false}),
    validatorHandle(getCategoriesSchema, 'params'),
    async(req, res, next)=>{


    try {

      const {idCategoria} = req.params;
      const deleteCategoria =await service.delete(idCategoria)
      res.json(deleteCategoria)

    } catch (error) {
      next(error)
    }
})

module.exports = routerIndex;
