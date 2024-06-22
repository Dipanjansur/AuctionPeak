const jwt = require('jsonwebtoken');


const jwtKey = process.env.JWT_SECRET_KEY || "0aHF03KoixsveO9w2YeUXzDfg2ZSoV61Qy";

const generateAuthToken = (Users) => {
  const token = jwt.sign({ _id: Users.usersId, email: Users.email }, jwtKey, {
    expiresIn: '224h',
  });

  return token;
};

const verifyToken = (token) => {
  try {
    const tokenData = jwt.verify(token, jwtKey);
    return tokenData;
  } catch (error) {

  }
};
module.exports = {
  verifyToken, generateAuthToken
}