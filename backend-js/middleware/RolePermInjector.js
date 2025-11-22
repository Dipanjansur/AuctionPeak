const Users = require("../models/Users");
const Roles=require("../models/Roles");
const Permission=require("../models/Permissions");
const { Op } = require("sequelize");

const injectRoleAndPermissionMiddleware = async (req, res, next) => {
  const {UserRole} = req
  allRoles = [];
  for(var hello of UserRole){
    allRoles.push(hello.name);
  }

  try {
  const rolesWithPermissions = await Roles.findAll({
  where: { name: { [Op.in]: allRoles } },
  include: [
    {
      model: Permission,
      through: { attributes: [] },
    }
  ]
});

    if (!rolesWithPermissions) {
      console.log('Permisssions not found');
      return null;
    }
    const permissionsSet = new Set();
    rolesWithPermissions.forEach(role => {
      role.Permissions.forEach(permission => {
 
        permissionsSet.add(permission.PermissionName);
      });
    });
    req.permissions = permissionsSet;
    next();
  } catch (error) {
    console.error('Error injecting role and permission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = injectRoleAndPermissionMiddleware;