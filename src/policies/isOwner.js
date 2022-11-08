/*
  This can be used to block an User from trying to look up, edit or delete data from other users. 
  This policy will run before controllers logic (if false is returned the route controller is never called).
  Can be used in the necessary routes via route config.
*/
module.exports = (ctx, config, { strapi }) => {
  if (!ctx.params.id || !ctx.state.user) return false
  
  if (parseInt(ctx.params.id) !== ctx.state.user.id) return false;

  return true
};