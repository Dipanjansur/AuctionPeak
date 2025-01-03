const filterActionsByPermissions = (asset, actions, permissions) => {
  // Ensure inputs are valid
  if (!Array.isArray(actions) || !Array.isArray(permissions)) {
    throw new TypeError('Both actions and permissions must be arrays');
  }
  const permissionSet = new Set(permissions);
  if (asset.hasOwnProperty('createdBy') && asset.createdBy === true) {
    permissionSet.add(actions.id["update"])
  }
  return actions.filter(action => {
    if (!action || typeof action !== 'object') {
      console.warn('Invalid action object encountered');
      return false;
    }
    if (!action.requiredPermission) {
      console.warn(`Action ${action.id || 'unknown'} is missing requiredPermission`);
      return false;
    }
    // Check if user has the required permission
    return permissionSet.has(action.requiredPermission);
  });
};
module.exports = { filterActionsByPermissions }