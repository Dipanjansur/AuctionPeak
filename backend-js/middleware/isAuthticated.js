const jwtKey = process.env.JWT_SECRET_KEY || "l8L0KIpE)ra`*uF?x~'pX36p(3";
var jwt = require('jsonwebtoken');
const Users = require("../models/Users");
const Role = require('../models/Roles');
const Logging = require('../utils/Logger');
const { Logging_level, Entity, Events, Models } = require('../utils/LoggerParams');

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
    Logging(Logging_level.info, Entity.Middleware, Events.JWT_VALIDATIONS, "JWT token is authentiac and validated")
    req.userId = decoded._id;
    email = decoded.email
    const user = await Users.findOne({
      userId: decoded._id,
    });
    if (!user || user.email !== decoded.email) {
      Logging(Logging_level.error, Entity.Middleware, Events.READ_OP, " NO User is found against the JWT token", Models.Users)
      return res.status(404).json({
        code: res.statusCode,
        error: { message: 'invalid token' },
      });
    }
    Logging(Logging_level.info, Entity.Middleware, Events.READ_OP, "User is found against the JWT token", Models.Users)
    req.user = user;
    const UserRole = await Role.findOne({
      UserRole: Role.RoleId
    })
    if (!UserRole) {
      Logging(Logging_level.error, Entity.Middleware, Events.READ_OP, " NO User is found against the JWT token", Models.Users)
      return res.status(404).json({
        code: res.statusCode,
        error: { message: 'No valid User Roles Assiociated to the user' },
      });
    }
    Logging(Logging_level.info, Entity.Middleware, Events.READ_OP, "UserRoles is valid for the user sent in the JWT token", Models.Roles)
    req.UserRole = UserRole.name
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
module.exports = isAuthticated