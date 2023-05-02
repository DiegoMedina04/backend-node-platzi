'use strict';

const {userSchema, USER_TABLE} = require('./../models/userModel')
//const {PRODUCTS_TABLE, productsSchema }= require('./../models/productsModel')

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  async up (queryInterface) { //parte donde la crea
    await queryInterface.createTable(USER_TABLE, userSchema) //da una api una de esas es crea la tabla
    //await  queryInterface.createTable(PRODUCTS_TABLE, productsSchema )
  },

  async down (queryInterface) { //revertir lo qus cambios que hice up

      await  queryInterface.dropTable(USER_TABLE)
      //await  queryInterface.dropTable(PRODUCTS_TABLE)
  }
};
