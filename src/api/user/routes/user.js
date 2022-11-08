module.exports = {
  routes: [
    {
      method: "GET",
      path: "/user/:id/orders",
      handler: "user-orders.getUserOrders",
      config: {
        policies: ["global::isOwner"],
      },
    },
  ],
};
