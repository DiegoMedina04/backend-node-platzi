const { Model, DataTypes, Sequelize } = require('sequelize');
const {CUSTOMER_TABLE}=require('./customerModel')
const ORDER_TABLE = 'orders';

const OrderSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	customerId: {//un cliente puede tener muchas ordenes
		field: 'customer_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		References: {
			model: CUSTOMER_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
	},

    // total:{//tabla donde se calculara el valor total de los productos y no se mostrara el campo en la bd
    //     type: DataTypes.VIRTUAL,
    //     get(){
    //         if(this.items.length>0){
    //             return this.items.reduce((total,  item)=>{
    //                 return total + (item.price * item.order_product.amount )
    //             }, 0)
    //         }
    //         return 0
    //     }
    // }
};

class Order extends Model {
    static associate(models) {
      this.belongsTo(models.Customer, {//una orden tenga muchos clientes
        as: 'customer',
      });
      this.belongsToMany(models.Product,{ //relacion muchos a muchos.
            as:'items',
            through: models.order_product, //significa cual sera la tabla ternaria que tendra la relacion de muchos a muchos
            foreignKey: 'orderId',
            otherKey:'productId'
      })
    }

    static config(sequelize) {
      return {
        sequelize,
        tableName: ORDER_TABLE,
        modelName: 'Order',
        timestamps: false,
        getterMethods: {
          total() {
            if(this.items.length>0){
                return this.items.reduce((total,  item)=>{
                    return total + (item.price * item.order_product.amount )
                }, 0)
            }
            return 0
          }
        }
      };
    }
  }

  module.exports = { Order, OrderSchema, ORDER_TABLE };
