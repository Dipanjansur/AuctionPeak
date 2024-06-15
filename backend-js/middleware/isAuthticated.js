const jwtKey = process.env.JWT_SECRET_KEY || "l8L0KIpE)ra`*uF?x~'pX36p(3";
var jwt = require('jsonwebtoken');
const Users = require("../models/Users");

const isAuthticated = async (req, res, next) => {
  const AuthBearerToken = req.header("Authorization");

  if (!AuthBearerToken) {
    return res.status(401).json({ error: 'Access denied' });
  }
  if (AuthBearerToken.startsWith("Bearer ")) {
    token = AuthBearerToken.substring(7, AuthBearerToken.length);
  } else {
    return res.status(401).json({ error: "Token is not Appropiate" });
  }
  try {
    const decoded = jwt.verify(token, jwtKey);
    req.userId = decoded._id;
    email = decoded.email
    const user = await Users.findOne({
      userId: decoded._id,
    });
    req.authenticated = !!user;
    if (!user || user.email !== decoded.email)
      return res.status(404).send({
        code: res.statusCode,
        error: { message: 'invalid token' },
      });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
module.exports = isAuthticated