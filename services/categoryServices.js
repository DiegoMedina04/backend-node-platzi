const faker = require('faker');
const boom = require('@hapi/boom');
const {models}= require('./../libs/sequelize');
class categoryServices{

  constructor(){

    this.categories=[];
    this.generator()

  }

 async generator(){


    const limit =3;
    for (let index = 0; index < limit; index++) {
      this.categories.push({

        categoria:  faker.datatype.uuid(),
        producto: Math.random()+10*Math.random(),

      })
    }
  }

  async find(){
     return this.categories;
  }

  async findOne(idCategoria  ){
      try {

        const produc =await this.categories.find(i => i.categoria ===idCategoria)
        if(produc){
          return produc
        }else{
          throw boom.notFound()
        }


      } catch (error) {
          throw boom.notFound('ss')
      }
  }

  async create(categoria){
    try {
   
      const newCategory = await models.Category.create(categoria)

      return newCategory
      // const newProduct ={
      //   categoria:faker.datatype.uuid(),
      //   producto
      // }
      // this.categories.push(newProduct)
      // return newProduct

    } catch (error) {
      throw boom.notAcceptable(error)
    }
  }

  async update(idCategoria, changes){

    try {

      const indexCategoria = this.categories.findIndex(i =>i.categoria===idCategoria)

      if(indexCategoria===-1) throw boom.notFound('El producto no existe')

      const categoria = this.categories[indexCategoria]

      this.categories[indexCategoria]={
        ...categoria,
        ...changes
      }
      return this.categories[indexCategoria]

    } catch (error) {
      throw boom.notFound('El producto no existe')
    }
  }

    async delete(idCategoria){

      try {
        const indexCategoria = this.categories.findIndex(i =>i.categoria===idCategoria)
        if(indexCategoria===-1) throw boom.notFound('Categoria no encontrado')

        this.categories.splice(indexCategoria,  1)
        return {message : 'Categoria eliminada'}

      } catch (error) {
        throw boom.notFound('Categoria no encontrado')
      }
  }


}

module.exports= categoryServices;
