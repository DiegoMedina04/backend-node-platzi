const express = require('express');
const passport = require('passport')
const OrderService = require('../services/orderService');

const routerIndex = express.Router()
const service = new OrderService();


routerIndex.post('/my-orders',

  passport.authenticate('local', {session:false}),
  async (req, res, next)=>{
    try {
      const user = req.user
      const order = service.findByUser(user.sub)
      res.json({ order})
    } catch (error) {
      next(error)
    }
  }
);

module.exports = routerIndex;
