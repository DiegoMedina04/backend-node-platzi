const { Model, DataTypes, Sequelize } = require('sequelize');

   const { ORDER_TABLE } = require('./ordersModel')
   const { PRODUCT_TABLE } = require('./productsModel')

   const ORDER_PRODUCT_TABLE = 'order_products';

   const OrderProductSchema =  {
     id: {
       allowNull: false,
       autoIncrement: true,
       primaryKey: true,
       unique: true,
       type: DataTypes.INTEGER
     },

     createdAt: {
       allowNull: false,
       type: DataTypes.DATE,
       field: 'created_at',
       defaultValue: Sequelize.NOW,
     },

     amount:{
        allowNull: false,
        type: DataTypes.INTEGER
     },
     orderId: {
       field: 'order_id',
       allowNull: false,
       type: DataTypes.INTEGER,

       references: {
         model: ORDER_TABLE,
         key: 'id'
       },
       onUpdate: 'CASCADE',
       onDelete: 'SET NULL'
     },
     productId: {
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,

        references: {
          model: PRODUCT_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
   }

   class OrderProduct extends Model {

     static associate() {

     }

     static config(sequelize) {
       return {
         sequelize,
         tableName: ORDER_PRODUCT_TABLE,
         modelName: 'order_product',
         timestamps: false
       }
     }
   }

   module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE }
