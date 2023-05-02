
const {models}= require('./../libs/sequelize');
const boom = require('@hapi/boom');
class CustomerServices{


  async create( data){
    try {

        const user = await models.Customer.create(data, {
          include:['user'] //sequelice ya sabe si en el objeto viene un user por la asociacion tiene que ir a crearlo
        })
      // const newUser = await models.User.create(data.user)
      // const user = await models.Customer.create({
      //   ...data,
      //   userId:newUser.id //las propiedades que no sean del customer las va a ignorar
      // })

      return user

    } catch (error) {
      throw  boom.notFound(error)
    }
  }

  async find(){
    try {

      const rta = await models.Customer.findAll({
        include:['user']
        //trae la informacion de forma anidada de la tabla user porque es la que esta conectada  a customer
      })
      return rta

    } catch (error) {
      throw  boom.notFound(error)
    }
  }

  async findOne(id){
    try {

      const rta = await models.Customer.findByPk(id,{
        include:['user']
      })
      if(rta){
        return rta
      }

    } catch (error) {
      throw boom.notFound(error)
    }
  }

  async update(id, changes){

    try {


      const user = await this.findOne(id)

      const rta = await user.update(changes)
     return rta

    } catch (error) {
      throw boom.notFound(error)
    }

  }

  async delete(id){
    try {
      const rta =await this.findOne(id)
      await rta.destroy()
      return {message: 'Deleted customer'}
    } catch (error) {
     throw boom.notFound(error)
    }
  }

}
module.exports =CustomerServices
