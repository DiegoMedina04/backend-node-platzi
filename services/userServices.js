const faker = require('faker');
const boom = require('@hapi/boom');


//const getConection = require('../libs/postgres')
//const pool = require('../libs/postgresPool')

const {models}= require('./../libs/sequelize') //cada vez que en squelice  se envia el setuoModels el crea un nameSpace donde guarda los models

class userServices{

  constructor(){

    this.user=[]
    this.generatorUser()
    // this.pool = pool;
    

  }

  generatorUser(){

    const limit =3;
    for (let index = 0; index < limit; index++) {
      this.user.push({
        id:faker.datatype.uuid(),
        name: faker.commerce.productName(),
      })

    }

  }

  async create(body ){
    try {


      const user = await models.User.create(body )

      //delete user.dataValues.password
      return user

    } catch (error) {
        return {message:error}
    }

    // const newUser={
    //   id:faker.datatype.uuid(),
    //   ...body
    // }
    // this.user.push(newUser)
    // return newUser;

  }

  async find(){ //En user se trabaja la conexion por sequelice y productor por pool

   // const client = await getConection();
    const rta =await models.User.findAll({
      include: ['customer']
    })
    //const rta = await this.pool.query('SELECT*FROM tasks')
    return rta
    //return rta.rows
    //return this.user;
  }


  async findByEmail(email){
     const rta =await models.User.findOne({
      where: {email}
     })

     return rta
   }


  async findOne(id){

    try {

      const rta = await models.User.findByPk(id, {
        include:['customer']
      })

      if(rta==null){
        throw boom.notFound()
      }
      return rta



    } catch (error) {
      throw boom.notFound(error)
    }


  }

   async update(id, changes){

    try {

    const rta = await this.findOne(id)
    await rta.update(changes)

    return {message: 'Password actulizada'}




    //   const indexUser = this.user.findIndex(i => i.id===id)
    // if(indexUser ===-1) throw boom.notFound('Usuario no existe!!')
    //   const users = this.user[indexUser];
    // this.user[indexUser]={
    //   ...users,
    //   ...changes
    // }
    // return this.user[indexUser];

    } catch (error) {
      throw boom.notFound('Usuario no existe!!')
    }

  }


  async delete(id ){
    try {
      const rta = await this.findOne(id)
      rta.destroy()

      return {message: 'usuario eliminado'}

    // const indexUser = this.user.findIndex(i => i.id ===id)
    // if(indexUser===-1)throw boom.notFound('El usuario no existe')
    // this.user.splice(indexUser, 1)
    // return {message: 'Usuario eliminado'}

    } catch (error) {
      throw boom.notFound('El usuario no existe')
    }

  }
}

module.exports= userServices;

