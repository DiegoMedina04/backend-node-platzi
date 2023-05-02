const express = require('express');
const routerIndex = express.Router();
const productsServices = require('./../services/productsServices');
const services = new productsServices();
const {validatorHandle} = require('./../middlewares/validatorHandler');
const passport = require('passport')
const { createProductSchema , updateProductSchema , getProductSchema}= require('./../schemas/productsSchemas')

routerIndex.get('/',
  passport.authenticate('jwt', {session:false}),
  async (req, res)=>{

  try {

    const productos = await services.find()
    res.json( productos);

  } catch (error) {
    res.json(error.message)
  }

  //  const size = req.query;
  //  const limit = size || 10;
  // for (let index = 0; index < limit; index++) {
  //   this.products.push({
  //     id: faker.datatype.uuid(),
  //     name: faker.commerce.productName(),
  //     price: parseInt(faker.commerce.price(), 10),
  //     image: faker.image.imageUrl(),
  //   });
  // }
});




routerIndex.get('/:id',
  passport.authenticate('jwt', {session:false}),
  validatorHandle(getProductSchema, 'params'), //se le dice de donde viene la informacion, en este caso es de params
  async (req, res, next)=>{

  try {

    const {id} = req.params;
    const product =await services.findOne(id)

    res.json(product)

  } catch (error) {

    next(error)
  }

});

routerIndex.get('/:productosId/:name/:price', (req, res)=>{
  const {productosId} = req.params;
  res.json(
    {
      productosId,
      name: 'product 1',
      price: 2000
    },
  )
})

routerIndex.post('/',
  passport.authenticate('jwt', {session:false}),
  validatorHandle(createProductSchema, 'body'),
  async (req, res, next)=>{ // app.use(express.json()) colocar el middleware en el index principal
    try {

      const body = req.body; //recibe lo que se le manda por insomia

      const newProduct=await services.create(body)
      res.json(newProduct)

    } catch (error) {
      next(error)
    }
})

//updateProductSchema

routerIndex.patch('/:id',
  passport.authenticate('jwt', {session:false}),
  validatorHandle(getProductSchema, 'params'),
  validatorHandle(updateProductSchema , 'body'),
  async(req, res, next)=>{

  try {

    const {id} = req.params;
    const body = req.body; //recibe lo que se le manda por insomia (el objeto)
    const product=await services.update(id, body);
    res.json( product);

  } catch (error) {
      next(error)
  }

});

routerIndex.delete('/:id',
  passport.authenticate('jwt', {session:false}),
    validatorHandle(getProductSchema, 'params'),
    async ( req, res)=>{
    try {

      const {id}= req.params;
      const product = await services.delete(id)
      res.json({product})

    } catch (error) {
      res.json(error.message)
    }
});



module.exports=routerIndex;

