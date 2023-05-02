
const {userSchema,  User} =       require('./userModel')
const {ProductSchema, Products }= require('./productsModel')
const {CustomerSchema, Customer}= require('./customerModel')
const {CategorySchema, Category}= require('./categoriesModel')
const { OrderSchema, Order }=     require('./ordersModel')
const {OrderProductSchema, OrderProduct }=require('./orderProductsModels')

//2 PASO!!

// se encarga de enviar la conexion a los modelos y puede mapear los datos
function setupModels(sequelize){
  //ir al model y haga init le envia el modelo para que se cree como lo dicta y la configuracion

  //ACA ESTARAN TODOS LOS MODELOS

  User.init(userSchema, User.config(sequelize)); //el modelo tiene que tener el esquema y envialer la config
  Products.init(ProductSchema, Products.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Order.init(OrderSchema, Order.config(sequelize))
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize))

  User.associate(sequelize.models)
  //si los modelos tiene algun tipo de relacion lo ejecuta
  Customer.associate(sequelize.models)
  Category.associate(sequelize.models)
  Products.associate(sequelize.models)
  Order.associate(sequelize.models)
}
module.exports= setupModels
