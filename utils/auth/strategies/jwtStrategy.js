const {Strategy, ExtractJwt} = require('passport-jwt')

const {config} = require('./../../../config/config')

const options ={
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:config.jwtSecret //para verfificar si la firma es valida o no
}

const jwtStrategy = new Strategy(options, (payload, done)=>{ //el internamente ira a extraer el payload 
  return done(null, payload)
})

module.exports = jwtStrategy
