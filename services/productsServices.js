const faker = require('faker');
const boom = require('@hapi/boom');
//const pool = require('../libs/postgresPool')
//const sequelize = require('../libs/sequelize') sequelize.query(variable donde esta guardada la consulta ): [data]

const {models}= require('./../libs/sequelize');

// fetch('http://your-backend-server/api/protected', {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// }) forma de como se envia el token desde el frontend

class productsServices{


  constructor(){

    this.products=[];
    this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err)=>console.error('Hubo un problema: ',err))
  }

  generate(){
    const limit = 13;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id:faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt( faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      })

    }
  }

  async create(data){
    try {

      const user = await models.Product.create(data)
      return user
      // const newProduct={
      //   id:faker.datatype.uuid(),
      //   ...data
      // }

      // this.products.push(newProduct)

      // return newProduct;

    } catch (error) {
      throw boom.notAcceptable(error)
    }

  }

  async find(){
    //En user se trabaja la conexion por sequelice y productor por pool

    try {
      const rta =await  models.Product.findAll({
        include: ['category']
      })

      return rta

    } catch (error) {
      throw boom.notAcceptable(error)
    }


    // const query = 'SELECT * FROM tasks'
    // const [data] = await sequelize.query(query);
    // return {
    //   data
    // }

    //const rta = await this.pool.query(query);
    //return rta.rows


  //   return new Promise(( resolve)=>{
  //   setTimeout(() => {
  //       resolve(this.products)
  //   },1000);
  // })

    //return this.products
  }

  async findOne(id){
   try {
    const rta = models.Product.findByPk(id, {
      include: ['category']
    })

    if(rta==null){
      throw boom.notFound()
    }
    return rta

   } catch (error) {
    throw boom.notFound('No se encontro')
   }
    // //const hola = this.getTotal()
    // const produc =await this.products.find(i => i.id ===id)
    // if(produc){
    //   return produc
    // }else{


    //   throw boom.notFound('Producto no encontrado')
    // }



  }



  async update(id , changes){

   try {
    const user =await this.findOne(id)

    if(user){
      //se actuliza por medio del user
      const rta = await user.update(changes)
      return rta
    }else{
        throw boom.notFound('No se encontro el id')
    }

    // const index =  this.products.findIndex( item => item.id===id);

    // if(index===-1)throw boom.notFound()

    // const product =this.products[index]
    // this.products[index]= {
    //   ...product,//mantiene
    //   ...changes//cambia solo el valor que necesito
    // };
    // return  this.products[index];

   } catch (error) {
    throw boom.notFound(error)
   }

  }

  async delete(id){
    try {

      const user = await this.findOne(id)
      if(user){
        await user.destroy()
        return {message: 'Producto eliminado'}
      }else{
        return {message: 'Producto no eliminado'}
      }


    // const index =  this.products.findIndex( item => item.id===id);
    // if(index===-1)  throw boom.notFound('Producto no encontrado');
    // this.products.splice(index, 1);
    // return {message: 'Producto borrado!!'}

    } catch (error) {
      throw boom.notFound(error)
    }
  }



}

module.exports= productsServices;



