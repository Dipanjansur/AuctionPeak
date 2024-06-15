const jwt = require('jsonwebtoken');


const jwtKey = process.env.JWT_SECRET_KEY || "l8L0KIpE)ra`*uF?x~'pX36p(3";

const generateAuthToken = (Users) => {
  const token = jwt.sign({ _id: Users.usersId, email: Users.email }, jwtKey, {
    expiresIn: '24h',
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