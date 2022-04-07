module.exports = {
  async logout(ctx) {
    ctx.cookies.set("token", null);
    ctx.send({
      authorized: true,
      message: "Successfully deleted session",
    });
  },
};
