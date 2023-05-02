const express = require('express');
const passport = require('passport')
const {validatorHandle}= require('./../middlewares/validatorHandler')
const {authSchema}=require('./../schemas/authSchemas')
const routerIndex = express.Router()
const authService = require('./../services/authServices')
const service = new authService()

routerIndex.post('/login',
  validatorHandle(authSchema, 'body'),
  passport.authenticate('local', {session:false}), // esto lo que hara es ir a la estrategia y hara lo que hay alla que  es para buscar si el usuario
  async (req, res, next)=>{
    try {

      const user = req.user
      const token = service.signToken(user)

      res.json({user, token })
    } catch (error) {
      next(error)
    }
  }
);
routerIndex.post('/recovery',


  async (req, res, next)=>{
    try {

      const {email}= req.body
      const rtaEmail = await service.sendRecovery(email)
      res.json(rtaEmail)
    } catch (error) {
      next(error)
    }
  }
);



module.exports = routerIndex;
