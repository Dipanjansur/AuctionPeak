const Users = require("../models/Users");
const Role = require('../models/Roles');
const Permissions=require("../models/Permissions")
const injectRoleAndPermissionMiddleware = async (req, res, next) => {
  try {
    
    console.log(req.user.usersId)
    // Extract role and permission information
    const user_role = await Users.findOne({
      where: { usersId: req.user.usersId },
      include: [
        {
          model: Role,
          as:"Roles", // Include the Role model
          through: {
            attributes: [], // Exclude attributes from the join table
          },
          include:[
            {
            model:Permissions,
            through: {
              attributes: [], // Exclude attributes from the join table
            },
            }
          ]
        },
      ],
    });
    if (!user_role) {
      return res.status(404).json({ message: 'User not found' });
    }
    // const permissions = role.permissions;

    // Inject role and permissions into req object
    req.user = user_role.dataValues;
    // req.user.permissions = permissions;
    next();
  } catch (error) {
    console.error('Error injecting role and permission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = injectRoleAndPermissionMiddleware;