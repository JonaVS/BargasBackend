module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/order/place-order",
      handler: "custom-order.placeOrder",
    },
  ],
};
