const  bcrypt = require('bcrypt')

async function verifyPassword(){
  const myPassword ='admin123'
  const hash2 =  await bcrypt.hash(myPassword, 10)
  const isMatch =  await bcrypt.compare(myPassword, hash2)
  //console.log('isMatch:  ',isMatch)
}

module.exports={verifyPassword}
