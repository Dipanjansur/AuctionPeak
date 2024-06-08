function roleChecker(requiredRole) {
  return function (req, res, next) {
    const user = req.user;

    if (!user) {
      return res.status(401).send('User not authenticated');
    }

    if (user.role !== requiredRole) {
      return res.status(403).send('User does not have the required role');
    }
    next();
  };
}

module.exports = roleChecker;