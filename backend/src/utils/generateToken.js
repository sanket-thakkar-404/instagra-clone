const Jwt = require('jsonwebtoken');



const generateToken = (userId, username) => {
  if (!process.env.JWT_SECRET) throw new Error("Jwt Secret not Found !!!");

  const token = Jwt.sign(
    { id: userId , username},
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  return token

}


module.exports = generateToken;