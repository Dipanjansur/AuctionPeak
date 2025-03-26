const { User, Role, Permission } = require('../models'); // Assuming you have models for User, Role, and Permission

const injectRoleAndPermissionMiddleware = async (req, res, next) => {
  try {
    // Retrieve user information based on userId
    const user = await User.findById(req.user.id)
      .populate('role')
      .exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract role and permission information
    const role = await User.findOne({
      where: { id: userId },
      include: [{
        model: Role,
        through: {
          attributes: [] // Exclude attributes from the join table
        }
      }]
    });
    const permissions = role.permissions;

    // Inject role and permissions into req object
    req.user.role = role;
    req.user.permissions = permissions;

    next();
  } catch (error) {
    console.error('Error injecting role and permission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = injectRoleAndPermissionMiddleware;