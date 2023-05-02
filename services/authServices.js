const  bcrypt = require('bcrypt')
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

const {config} = require('./../config/config')
const userService= require('./userServices')
const service = new userService()





class authServices{


  async getUser(email, password ){

    const user = await service.findByEmail(email)
    if(!user){
       throw boom.unauthorized()
    }

    const isMatch =  await bcrypt.compare(password, user.password)

    if(!isMatch){
      throw boom.unauthorized()
    }

    delete user.dataValues.password
    return user

  }


  signToken(user){

    const payload={
      sub:user.id,
      role:user.role
    }
    const token = jwt.sign(payload, config.jwtSecret)

    return token
  }

  async sendRecovery(email){


    const user = await service.findByEmail(email)
    if(!user){
       throw boom.unauthorized()
    }

    const payload ={sub: user.id}
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;


    const infoEmail={
      from:  'diegoprada005@gmail.com',
      to:  user.email,
      subject: "Recuperar contraseña ✔",
      html: `<b>Ingresa a este link => ${link}</b>`,

    }

    const rta = await this.sendEmail(infoEmail)
    return rta
  }

  async sendEmail(infoEmail){

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure:true,
      port: 465,
      auth: {
          user: 'diegoprada005@gmail.com',
          pass: 'ssedoibulnrwnpdg'
      }
    });


    await transporter.sendMail(infoEmail);


    return {message: 'email send'}

  }


}
module.exports =authServices
