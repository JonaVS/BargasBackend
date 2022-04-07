module.exports = () => {
  return async (ctx, next) => {
    if (
      ctx.request &&
      ctx.request.header &&
      !ctx.request.header.authorization
    ) {
      const token = ctx.cookies.get("token");
      if (token) {
        ctx.request.header.authorization = `Bearer ${token}`;
      }
    }
    await next();
  };
};
