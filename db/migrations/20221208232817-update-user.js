'use strict';

const {userSchema, USER_TABLE} = require('./../models/userModel')
//const {PRODUCTS_TABLE, productsSchema }= require('./../models/productsModel')
const {  CustomerSchema, CUSTOMER_TABLE } = require('./../models/customerModel')
/** @type {import('sequelize-cli').Migration} */

module.exports = {

  async up (queryInterface) { //parte donde la crea
    await  queryInterface.dropTable(CUSTOMER_TABLE)
    await  queryInterface.dropTable(USER_TABLE)
    await queryInterface.createTable(USER_TABLE, userSchema) //da una api una de esas es crea la tabla
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema) //da una api una de esas es crea la tabla
    //await  queryInterface.createTable(PRODUCTS_TABLE, productsSchema )
  },

  async down (queryInterface) { //revertir lo qus cambios que hice up

      await  queryInterface.dropTable(USER_TABLE)
      //await  queryInterface.dropTable(PRODUCTS_TABLE)
  }
};
