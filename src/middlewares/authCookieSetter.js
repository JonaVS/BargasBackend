module.exports = () => {
  return async (ctx, next) => {
    await next();
    if (
      ctx.request.url.startsWith("/api/auth/") &&
      ctx.response.status === 200
    ) {
      const { jwt: jwtToken } = ctx.response.body;
      ctx.cookies.set("token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 14, 
        domain:
          process.env.NODE_ENV === "development"
            ? "localhost"
            : process.env.PRODUCTION_URL,
        sameSite: process.env.NODE_ENV === "development" ? true : "none",
        overwrite: true,
      });
      delete ctx.response.body["jwt"];
    }
  };
};
