const productsRouter = require('./productsRouter');
const userRouter     = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const customerRouter = require('./customerRouter');
const ordersRouter = require('./ordersRouter');
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');
const express = require('express');

function routerApi(app){
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/auth', authRouter)
  router.use('/profile', profileRouter)
  router.use('/products', productsRouter)
  router.use('/users', userRouter)
  router.use('/categories', categoriesRouter)
  router.use('/customer', customerRouter)
  router.use('/order', ordersRouter)


}

module.exports= routerApi

