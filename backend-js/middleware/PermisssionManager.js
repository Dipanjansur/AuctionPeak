// TODO: this middleware is not working
// function scoped(req, entity, Userrelation) {
//   console.log("$$$$$$$$$$$$$$$$$$$$", req, entity, Userrelation)
//   retricedUser = req.user;
//   if (retricedUser === ROLE.ADMIN) return entity
//   return entity.filter(entity => entity.Userrelation === Users.usersId)
// }

// function canView(user, project) {
//   return (
//     user.role === ROLE.ADMIN ||
//     project.userId === user.id
//   )
// }

// function canUpdate(user, project) {
//   return (
//     user.role === (ROLE.ADMIN || ROLE.MODS) ||
//     project.userId === user.id
//   )
// }

// function canDelete(user, project) {
//   return (
//     user.role === (ROLE.ADMIN || ROLE.MODS) ||
//     project.userId === user.id
//   )
// }
// const ROLE = Object.freeze({
//   ADMIN: 'ADMIN',
//   USER: 'USER',
//   FREE_TIER: 'FREE-TIER',
//   MODS: 'MODS'
// });


// module.exports = {
//   ROLE,
//   canView,
//   canUpdate,
//   canDelete
// }