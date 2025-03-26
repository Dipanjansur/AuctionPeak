const filterActionsByPermissions = (asset, actions, permissions) => {
  // Ensure inputs are valid
  if (!Array.isArray(actions) || !Array.isArray(permissions)) {
    throw new TypeError('Both actions and permissions must be arrays');
  }

  const permissionSet = new Set(permissions);
  if (asset.hasOwnProperty('createdBy') && asset.createdBy === true) {
    permissionSet.add(actions.id["update"])
  }
  console.log(permissionSet)
  return permissionSet;
  // let fileterdActions= actions.filter(action => {
  //   if (!action || typeof action !== 'object') {
  //     console.warn('Invalid action object encountered');
  //     return false;
  //   }
  //   if (!action.requiredPermission) {
  //     console.warn(`Action ${action.id || 'unknown'} is missing requiredPermission`);
  //     return false;
  //   }
  //   // Check if user has the required permission
  //   return permissionSet.has(action.requiredPermission);
  // });
  // console.log(asset.dataValues.AuctionId)
  // // return fileterdAction
  // // return fileterdAction.map((action)=>{
  // //   console.log(action.action.url);
  // //   return {
  // //     ...action,
  // //     action: {
  // //       ...action.action,
  // //       // url: action.action.url.replace('{{asset.id}}', asset.dataValues.AuctionId)
  // //     }
  // //   };
  // // })

  // return fileterdActions.map(action => {
  //   // Check if action and action.action exist
  //   if (action.action && action.action.url) {
  //     // Check if the URL contains the {{asset.id}} placeholder
  //     if (action.action.url.includes('{{asset.id}}')) {
  //       return {
  //         ...action,
  //         action: {
  //           ...action.action,
  //           url: action.action.url.replace('{{asset.id}}', asset.dataValues.AuctionId)
  //         }
  //       };
  //     }
  //   }
  //   return action;
  // });

};
module.exports = { filterActionsByPermissions }