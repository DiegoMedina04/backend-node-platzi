const { Model, DataTypes, Sequelize } = require('sequelize');
const  bcrypt = require('bcrypt')
//OBSERVAR EL RETURN DE LA CLASE IMPORTANTE  LEER timestamps
//1 PASO!!



//aca se crea la estructura para la sequelice la cree en base de datos

const  USER_TABLE='users'; //nombre de la tabla

//esquema que va a crear en la base de datos

const userSchema={
  id: {
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  role:{
    allowNull: false,
    type:DataTypes.STRING,
    defaultValue: 'admin'
  },

  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true, //UNICO
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  recoveryToken: {
    allowNull: true,
    type: DataTypes.STRING,
    field:'recovery_token'
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', //nombre como quiere que se llame el campo de la db sino tomara el por defecto
    defaultValue: Sequelize.NOW //VALOR POR DEFECTO el momento en el que se inserto el registro con NODE.JS
  }
}

class User extends Model{ //esto hace de los atributos findAll
  // static associate() { //para hacer asociaciones
  //   // associate
  // }
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId' //con esto podremos cargar la informacion del customer desde el user
    })
    }


  static config(sequelize) { // recibe la conexion sequelice y retorna la configuracion

    return  {
      sequelize, //cual es la conexion
      tableName: USER_TABLE,
      modelName:'User',
      timestamps: false, //crear campos por defecto SIEMPRE EN FALSE!!! creara campos de createAt y updateAt
      hooks:{
        beforeCreate: async (user, options)=>{
          const password = await bcrypt.hash(user.password, 10)
          user.password= password
        }
      }

    }
  }

}

module.exports= {USER_TABLE,userSchema,  User}
