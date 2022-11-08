"use strict";

module.exports = {
  async getUserOrders(ctx) {
      return strapi.plugins["users-permissions"].controllers.user.findOne(ctx);
  },
};
